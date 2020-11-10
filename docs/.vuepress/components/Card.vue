<template>
  <a-col :sm="24" :md="12" :lg="6">
		<a-card hoverable size="small">
      <a :href="link" target="_blank" rel="noopener noreferrer">
      <a-card-meta :title="title" :description="content">
      <a-avatar slot="avatar" size="large" :src="head"/>
			</a-card-meta>
      </a>
	</a-card>
	</a-col>
</template>

<script>
export default {
  name:"Card",
  props:[
    "head",
    "link",
    "title",
    "content"
  ]
}
</script>