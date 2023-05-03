<template>
  <div class="pagination">
    <button @click="$emit('getPage', pageNo-1)" :disabled="pageNo==1">上一页</button>
    <button v-if="pageNo > 3" @click="$emit('getPage', 1)" :class="{active:pageNo==1}">1</button>
    <button v-if="startAndEnd.start > 2">···</button>
    <button 
      v-for="(page,index) in startAndEnd.end" 
      :key="index" 
      v-if="page>=startAndEnd.start"
      @click="$emit('getPage', page)"
      :class="{active:pageNo==page}"
    >{{ page }}</button>
    <button v-if="startAndEnd.end < totalPage - 1">···</button>
    <button v-if="pageNo < totalPage- 2" @click="$emit('getPage', totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    <button @click="$emit('getPage', pageNo+1)" :disabled="pageNo==totalPage">下一页</button>
    <button style="margin- left: 30px">共 {{ total }} 条</button>
  </div>
</template>                 
  
<script>
    export default {
        name: "Pagination",
        // 当前页，每页多少数据，总共有多少条数据，连续页码数
        props:['pageNo' ,'pageSize','total' ,'continues'],
        computed:{
          totalPage(){
            return Math.ceil(this.total/this.pageSize)
          },
          //获取分页器连续页码的开始页和结束页
          startAndEnd(){
            //解构出当前页码，连续页码数，总页数
            const {pageNo ,continues ,totalPage}= this;
            //先定义两个变量存储起始数字与结束数字
            let start = 0, end = 0;
            if(continues > totalPage){
              start = 1;
              end = totalPage;
            } else{
                start = pageNo - parseInt(continues/2);
                end = pageNo + parseInt(continues/2);
                if(start < 1){
                  start = 1;
                  end = continues;
                } else if(end > totalPage){
                  start = totalPage - continues + 1
                  end = totalPage
                }
            } 
            return {start,end}
          }
        },
        // methods:{
        // }
    };
</script>
  
<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
  