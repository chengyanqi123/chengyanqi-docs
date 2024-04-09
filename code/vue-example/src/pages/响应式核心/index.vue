<template>
    <div class="reactive-core">
        <div class="item">
            <reactiveAndRef />
        </div>
        <div class="item">
            <refAndtoRef />
        </div>
        <div class="item">
            <computedE />
        </div>
        <div class="item">
            <watchE />
        </div>
        <div class="item">
            <watchEffectE />
        </div>
        <div class="item">
            <definExposeE />
        </div>
        <div class="item">
            <lifeCycle />
        </div>
    </div>
</template>

<script setup>
import reactiveAndRef from './components/01.reactiveAndRef.vue'
import refAndtoRef from './components/02.refAndtoRef.vue'
import computedE from './components/03.computedE.vue'
import watchE from './components/04.watchE.vue'
import watchEffectE from './components/05.watchEffectE.vue'
import definExposeE from './components/06.definExposeE.vue'
import lifeCycle from './components/07.基本生命周期.vue'
</script>

<style scoped lang='scss'>
.reactive-core {
    width: 100%;

    .item {
        width: 100%;
        border-top: 1px dashed #000;
        margin: 10px 0;
        background-color: #b38ba2;
        padding: 20px;
        box-sizing: border-box;
    }
}
</style>