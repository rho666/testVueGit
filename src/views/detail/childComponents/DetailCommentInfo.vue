<template>
  <div v-if='Object.keys(commentInfo).length !== 0' class='detail-commment-info'>
    <div class='more-comment'>
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div class='msg-comment'>
      <div class='comment-user'>
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class='comment-content'>
        <p class='content'>{{commentInfo.content}}</p>
        <p class='detail'>
          <span>{{commentInfo.created | showDate}}  </span>
          <span>{{commentInfo.style}}</span>
          </p>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.images" :key="index">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils.js'

export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      const date = new Date(value * 1000)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
  .detail-commment-info {
    border-top: 2px solid rgb(231, 228, 228);
    padding: 10px;
    border-bottom: 2px solid rgb(231, 228, 228)
  }
  
  .more-comment {
    display: flex;
    padding: 0 0 10px 0;
    border-bottom: 1px solid rgb(231, 228, 228)
  }

  .more-comment {
    justify-content: space-between;
  }

  .comment-user {
    padding: 5px 0;
  }

  .comment-user img {
    width: 30px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .comment-user span {
    margin: 0 0 0 5px;
    font-size: 14px;
  }

  .content {
    font-size: 13px;
    color:rgb(63, 59, 59);
  }

  .detail {
    font-size: 12px;
    color: #979595;
    padding: 5px 0;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>