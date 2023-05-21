<script setup>
import MaterialButton from "@/components/MaterialButton.vue";
import { Store, useStore } from "vuex";
import { reactive } from "vue";
import http from "@/api/http.js";

const store = useStore();
const props = defineProps({
    comment: {
    type: Object,
    default: null,
  },
});
const newComment = reactive({
    commentNo: props.comment.commentNo,
    userId: props.comment.userId,
    articleNo: props.comment.articleNo,
    content: props.comment.content,
})
const click =reactive({
    modify: false,
})
async function modify(){
    if(click.modify){ // 수정중 -> 수정 완료
        click.modify = false;
        await store.dispatch("commentStore/modify", newComment);
    }else{ // 수정 시작 -> 수정중
        click.modify = true;
    }
}
//수정 취소
function stopModify(){
    click.modify = false;
}
//한글 입력 처리 
function updateComment(e){
    newComment.content = e.target.value;
    console.log(newComment);
}

async function deleteC(){
    const param = {
        commentNo: props.comment.commentNo,
        articleNo: props.comment.articleNo
    }
    await store.dispatch("commentStore/deleteC", param);
    await store.dispatch("boardStore/decreaseComments", param.articleNo);
}
</script>

<template>
    <div v-if="comment != null">
        <img src="@/assets/img/user.png" class = "w-3">
        <div class = "d-inline">
            <h5 class = "d-inline">{{ comment.userName }}</h5>
        </div> 
        <div v-if="!click.modify">
            {{ comment.content }}
        </div>
        <div class="row" v-if="!click.modify">
            <div class = "col-lg-10"><h6 class="font-weight-light">{{ comment.date }}</h6></div>
        <div class = "col-lg-2 px-4" v-if="store.state.userStore.userInfo.id == comment.userId">
							<button type="button" id="btn-mv-modify"
								class="btn btn-outline-success btn-sm " v-on:click="modify">수정</button>
							<button type="button" id="btn-delete"
								class="btn btn-outline-danger btn-sm ms-1" v-on:click="deleteC">삭제</button>
						</div>
        </div>
        <div class="row" v-if="click.modify">
            <div class = "col-lg-10"><div>
                <textarea class="form-control mt-1 px-2" rows="2" :value = "newComment.content" @input="updateComment"></textarea>
            </div></div>
        <div class = "col-lg-2 px-4" v-if="store.state.userStore.userInfo.id == comment.userId">
							<button type="button" id="btn-mv-modify"
								class="btn btn-outline-success btn-sm " v-on:click="modify">수정</button>
							<button type="button" id="btn-delete"
								class="btn btn-outline-danger btn-sm ms-1" v-on:click="stopModify">취소</button>
						</div>
        </div>
        <hr class = "bg-light m-1">
    </div>
</template>