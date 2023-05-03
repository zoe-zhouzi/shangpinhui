<template>
    <div>
        <TypeNav/>
        <ListContainer/>
        <Recommand/>
        <Rank/>
        <Like/>
        <!-- Floor是没有在自己内部发送请求的，这里还进行了父子组件通信，因此再给子组件发数据时，home这是已经得到数据了 -->
        <Floor v-for="(floor, index) in floorList" :key="floor.id" :floorInfo="floor"/>
        <Brand/>
    </div>
</template>

<script>
    import ListContainer from './ListContainer'
    import Recommand from './Recommand'
    import Rank from './Rank'
    import Like from './Like'
    import Floor from './Floor'
    import Brand from './Brand'
    import {mapState} from 'vuex'
    export default {
        name: '',
        components:{
            ListContainer,
            Recommand,
            Rank,
            Like,
            Floor,
            Brand
        },
        computed:{
            ...mapState({floorList:state=>state.home.floorList})
        },
        mounted(){
            this.$store.dispatch('getFloorList'),
            //请问用户数据的action
            this.getUserInfo()
        },
        methods:{
            async getUserInfo(){
                try {
                    await this.$store.dispatch('getUserInfo')
                } catch (error) {
                    // alert('获取用户信息失败')
                }
            }
        }
    }
</script>

<style>

</style>