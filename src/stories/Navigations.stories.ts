import LNB from '~/components/LNB.vue'
import TheHeader from '~/components/TheHeader.vue'

export default {
  title: 'Notion/LNB',
  parameters: {
    layout: 'fullscreen'
  }
}

// `npm run netlify`로 개발 서버를 열어 놓아야 동작해요!
export const Primary = () => ({
  components: {
    LNB,
    TheHeader
  },
  template: /* html */ `
    <div style="
      height: 100vh;
      display: flex;
    ">
      <LNB />
      <div style="flex-grow: 1;">
        <TheHeader />
      </div>
    </div>
  `
})
