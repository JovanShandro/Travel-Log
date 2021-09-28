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
    <input class="input" type="date" v-model="visitDate" />
    <div v-if="errorOccured" class="error">An error occured!</div>
    <button class="btn">Create Entry</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useCreateLogEntryMutation } from '@/generated/graphql';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const title = ref('');
    const comments = ref('');
    const description = ref('');
    const image = ref('');
    const visitDate = ref('');
    const errorOccured = ref(false);
    const { mutate } = useCreateLogEntryMutation();

    const onSubmit = async () => {
      const newEntry = {
        title: title.value,
        comments: comments.value,
        image: image.value,
        visitDate: visitDate.value,
        description: description.value,
        longitude: store.state.addEntryLocation.lng,
        latitude: store.state.addEntryLocation.lat,
      };
      errorOccured.value = false;

      try {
        // Update data in database
        await mutate({
          data: newEntry,
        });
        // Make visitDate a timestamp as all local entries
        newEntry.visitDate = '' + new Date(visitDate.value).getTime();
        // Update local store
        store.commit('appendLogEntry', newEntry);
        store.commit('setAddEntryLocation', { lng: null, lat: null });
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
