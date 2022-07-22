import WorkspaceItem from '~/components/WorkspaceItem.vue'

export default {
  title: 'Notion/WorkspaceItem',
  parameters: {
    layout: 'fullscreen'
  }
}
const propsSample = {
  id: '1',
  title: 'Hello world?!'
}

export const PrimaryItem = () => ({
  components: {
    WorkspaceItem
  },
  template: /* html */ `
    <ul>
      <WorkspaceItem 
        :workspace="${templateify(propsSample)}" />
      <WorkspaceItem 
        :workspace="{
          id: '2',
          title: 'Good Morning~'
        }" />
    </ul>
  `
})

export const ChildItem = () => ({
  components: {
    WorkspaceItem
  },
  template: /* html */ `
    <ul>
      <WorkspaceItem 
        :workspace="{
          id: '1',
          title: 'Hello world!',
          children: [
            {
              id: '1-1',
              title: 'Hello Child..'
            }  
          ]
        }" />
      <WorkspaceItem 
        :workspace="{
          id: '2',
          title: 'Good Morning~'
        }" />
    </ul>
  `
})

function templateify(value: unknown) {
  return JSON.stringify(value).replace(/"/g, '\'')
}
