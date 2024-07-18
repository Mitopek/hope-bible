<script setup lang="ts">
import {$ref, $$, $computed} from "@vue-macros/reactivity-transform/macros";
import {onBeforeUnmount, onMounted, StyleValue, watch} from 'vue'
import {
  useFloating,
  autoUpdate,
  offset,
  shift,
  Placement,
  Alignment,
  size, autoPlacement, flip,
} from '@floating-ui/vue'

interface Props {
  isTransparent?: boolean
  placement?: Placement
  isOpen?: boolean
  matchReferenceSize?: boolean
  offsetMainAxis?: number
  offsetCrossAxis?: number
  dropdownClass?: string
  alignment?: Alignment
  minimalAcceptableHeight?: number
  fillAllSpace?: boolean
  placementStrategy?: 'autoPlacement' | 'flip'
}

interface Emits {
  (e: 'hide'): void
}

const props = withDefaults(defineProps<Props>(), {
  isTransparent: false,
  placement: 'bottom',
  isOpen: null,
  matchReferenceSize: false,
  offsetMainAxis: 5,
  offsetCrossAxis: 0,
  dropdownClass: null,
  alignment: 'start',
  minimalAcceptableHeight: 50,
  placementStrategy: 'autoPlacement',
  fillAllSpace: false,
})
const emit = defineEmits<Emits>()

const dropdownRef = $ref<HTMLElement>(null)
const referenceRef = $ref<HTMLElement>(null)

let isOpen = $ref<boolean>(props.isOpen)

watch(() => props.isOpen, (value) => {
  isOpen = value
})


// onClickOutside($$(contextMenuRef), () => {
//   isOpen = false
//   emit('hide')
// })

// useContextMenuOutside($$(referenceRef), () => {
//   isOpen = false
//   emit('hide')
// })


function onCoverClick() {
  isOpen = false
  emit('hide')
}

function matchReferenceSizeFactory() {
  return size({
    apply({rects}) {
      Object.assign(dropdownRef.style, {
        width: `${rects.reference.width}px`,
      })
    },
  })
}

function getPlacementMiddlewares() {
  return props.placementStrategy === 'autoPlacement' ?
      [
        autoPlacement({
          alignment: props.alignment,
          allowedPlacements: props.placement ? [props.placement] : undefined,
        }),
        size({
          apply({availableHeight,availableWidth ,elements}) {
            Object.assign(elements.floating.style, {
              maxHeight: `${Math.max(props.minimalAcceptableHeight, availableHeight)}px`,
              maxWidth: `${availableWidth}px`,
            })
          },
        }),
        shift({
          padding: 8,
        }),
      ]
      :
      [
        size({
          apply({availableHeight,availableWidth, elements}) {
            Object.assign(elements.floating.style, {
              maxHeight: `${Math.max(props.minimalAcceptableHeight, availableHeight)}px`,
            })
          },
        }),
        flip({
          fallbackStrategy: 'initialPlacement',
        }),
        shift({
          padding: 8,
        }),
      ]
}

let middlewares = [
  offset({
    mainAxis: props.offsetMainAxis,
    crossAxis: props.offsetCrossAxis,
  }),
  ...getPlacementMiddlewares(),
]

// function maxSize() {
//   return size({
//     apply({availableWidth, availableHeight}) {
//       Object.assign(dropdownRef.style, {
//         maxWidth: `${availableWidth - 20}px`,
//         maxHeight: `${availableHeight - 20}px`,
//       })
//     },
//   })
// }

if(props.matchReferenceSize) {
  middlewares = [
    ...middlewares,
    matchReferenceSizeFactory(),
  ]
}

const {floatingStyles, update} = useFloating($$(referenceRef), $$(dropdownRef), {
  placement: props.placement,
  middleware: middlewares,
  transform: false,
  whileElementsMounted: autoUpdate,
})

const dropdownStyle = $computed(() => {
  return {
    // background: props.isTransparent ? 'transparent' : 'hsla(0,0%,20%,1)',
  }
})

const onOpenEvent = () => {
  if(typeof props.isOpen === 'boolean') {
    return
  }
  isOpen = true
}

onMounted(() => {
  window.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', update)
})

const onReferenceClick = () => {

  // event?.preventDefault()
  onOpenEvent()
}

watch($$(referenceRef), (value, oldValue) => {
  oldValue?.removeEventListener('click', onReferenceClick)
  value?.addEventListener('click', onReferenceClick)
})

onBeforeUnmount(() => {
  if(referenceRef) {
    referenceRef.removeEventListener('click', onReferenceClick)
  }
})

function onClose() {
  isOpen = false
  emit('hide')
}

defineExpose($$({
  isOpen,
}))

const additionalDropdownStyle = $computed<StyleValue>(() => {
  if(!props.fillAllSpace) {
    return {}
  }
  return {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
</script>

<template>
  <div class="dropdown-wrapper" ref="referenceRef" :style="additionalDropdownStyle">
    <slot :isOpen="isOpen"/>
    <Teleport to="#teleported">
      <div class="cover" @click="onCoverClick" v-if="isOpen"/>
      <div
          class="dropdown"
          :class="dropdownClass"
          v-if="isOpen"
          ref="dropdownRef"
          :style="[floatingStyles, dropdownStyle]"
      >
        <slot name="dropdown" :isOpen="isOpen" :close="onClose"/>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
@use '../../variables' as variables;

.dropdown {
  position: fixed;
  background: map-get(variables.$colors, surfaceContainer);
  filter: drop-shadow(0px 0px 16px rgba(0,0,0,.33));
  z-index: 999999;
  border-radius: 10px;
  overflow: hidden;
}

.cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
}
</style>
