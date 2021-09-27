<template>
  <form class="form" @submit.prevent="onSubmit">
    <label class="label">Title</label>
    <input class="input" type="text" v-model="title" />
    <label class="label">Comments</label>
    <textarea class="input" rows="3" v-model="comments" />
    <label class="label">Description</label>
    <textarea class="input" rows="3" v-model="description" />
    <label class="label">Image Url</label>
    <input class="input" type="text" v-model="image" />
    <label class="label">Visit Date</label>
    <input class="input" type="text" v-model="visitDate" />
    <div v-if="errorOccured" class="error">An error occured!</div>
    <button class="btn">Create Entry</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useCreateLogEntryMutation } from '@/generated/graphql';

export default {
  props: ['handleClose', 'coordinates', 'updateLogEntries'],
  setup(props) {
    const title = ref('');
    const comments = ref('');
    const description = ref('');
    const image = ref('');
    const visitDate = ref('');
    const errorOccured = ref(false);
    const { mutate } = useCreateLogEntryMutation();

    const onSubmit = async () => {
      errorOccured.value = false;
      const newEntry = {
        title: title.value,
        comments: comments.value,
        image: image.value,
        visitDate: visitDate.value,
        description: description.value,
        longitude: props.coordinates.lng,
        latitude: props.coordinates.lat,
      };
      try {
        await mutate({
          data: newEntry,
        });
        (newEntry.visitDate = '' + new Date(visitDate.value).getTime()),
          props.updateLogEntries(newEntry);
        props.handleClose();
      } catch (e) {
        console.log(e.message);
        errorOccured.value = true;
      }
    };
    return {
      title,
      onSubmit,
      description,
      comments,
      image,
      visitDate,
      errorOccured,
    };
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
}
.input {
  border-radius: 5px;
  border: 1px solid black;
  padding: 5px;
  margin-bottom: 15px;
  width: 90%;
}
.label {
  width: 100%;
  font-weight: bold;
}
.btn {
  width: 60px;
}

.error {
  color: red;
  font-size: 0.9em;
  text-align: center;
}
</style>
