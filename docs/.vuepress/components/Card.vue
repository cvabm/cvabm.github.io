<template>
  <a-col :sm="24" :md="12" :lg="6">
  <a :href="link" target="_blank" rel="noopener noreferrer">
		<a-card hoverable>
			<img :src="cover" slot="cover" class="reset-height"/>
			<a-card-meta :title="title" :description="author">
			</a-card-meta>
		</a-card>
        </a>
	</a-col>
</template>
<script>
export default {
  name:"Card",
  props:[
    "cover",
    "link",
    "title",
    "author"
  ]
}
</script>