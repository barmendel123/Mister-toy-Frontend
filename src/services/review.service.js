import { httpService } from './http.service'
// import { storageService } from './async-storage.service'
import { userService } from './user.service'
import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'
import { getActionRemoveReview, getActionAddReview } from '../store/actions/review.action'
import { store } from '../store/index'
import { showSuccessMsg } from '../services/event-bus.service'

// const reviewChannel = new BroadcastChannel('reviewChannel')

;(() => {
  // reviewChannel.addEventListener('message', (ev) => {
  //   store.dispatch(ev.data)
  // })
  socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
    console.log('GOT from socket', review)
    store.dispatch(getActionAddReview(review))
  })
  socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
    showSuccessMsg(`New review about me ${review.txt}`)
  })
})()



export const reviewService = {
  add,
  query,
  remove
}


function query(filterBy) {
  return httpService.get(`review`)
  // return storageService.query('review')
}

async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
  // await storageService.remove('review', reviewId)
  // reviewChannel.postMessage(getActionRemoveReview(reviewId))


}
async function add(review) {
  const addedReview = await httpService.post(`review`, review)

  // review.byUser = userService.getLoggedinUser()
  // review.aboutUser = await userService.getById(review.aboutUserId)
  // const addedReview = await storageService.post('review', review)

  // reviewChannel.postMessage(getActionAddReview(addedReview))

  return addedReview
}
