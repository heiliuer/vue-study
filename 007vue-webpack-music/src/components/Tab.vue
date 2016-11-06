<template>
    <router-link class="tab-item external" :to="{path: path}" active-class="active" replace>
        <span class="icon" :class="iconClass"></span>
        <span class="tab-label" v-text="label"></span>
    </router-link>
</template>

<script>
    export default {
        props: {
            path: '',
            icon: '',
            label: ''
        },
        computed: {
            iconClass () {
                return `icon-${this.icon}`
            }
        }
    }
</script>
