import TheLoader from '~/components/TheLoader.vue'

export default {
  title: 'Notion/TheLoader',
  component: TheLoader,
  parameters: {
    layout: 'centered'
  }
}

export const Primary = () => ({
  components: {
    TheLoader
  },
  template: '<TheLoader />'
})

export const LargeBlue = () => ({
  components: {
    TheLoader
  },
  template: /* html */ `
    <TheLoader
      size="44" 
      width="4"
      color="royalblue" />
  `
})

export const AbsoluteCenter = () => ({
  components: {
    TheLoader
  },
  template: /* html */ `
    <div style="
      width: 300px; 
      height: 200px; 
      margin: 20px; 
      border: 4px solid gray; 
      position: relative;
    ">
      <TheLoader absolute />
    </div>
  `
})
AbsoluteCenter.parameters = {
  layout: 'fullscreen'
}

export const FixedCenter = () => ({
  components: {
    TheLoader
  },
  template: /* html */ `
    <div style="
      width: 300px; 
      height: 200px; 
      margin: 20px; 
      border: 4px solid gray; 
      position: relative;
    ">
      <TheLoader fixed />
    </div>
  `
})
FixedCenter.parameters = {
  layout: 'fullscreen'
}
