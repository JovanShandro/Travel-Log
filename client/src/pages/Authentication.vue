<template>
  <main>
    <form @submit.prevent="onSubmit">
      <h1>{{ title }}</h1>
      <div>
        <div class="inputField">
          <input type="text" placeholder="Username" v-model="username" />
          <div v-if="formErrors && formErrors.username" class="error">
            {{ formErrors.username }}
          </div>
        </div>
        <div class="inputField">
          <input type="password" placeholder="Password" v-model="password" />
          <div v-if="formErrors && formErrors.password" class="error">
            {{ formErrors.password }}
          </div>
        </div>
        <div class="link">
          {{ linkData.mainText }}
          <span class="linkText" @click="toggleAction">{{
            linkData.linkText
          }}</span>
        </div>
      </div>
      <div v-if="unknownErrorOccured" class="error">
        An error occured! Please try again later!
      </div>
      <button>Submit</button>
    </form>
  </main>
</template>

<script>
import { ref, computed } from 'vue';
import {
  useLoginMutation,
  useRegisterMutation,
  MeDocument,
} from '@/generated/graphql';
import { formatErrors } from '@/lib/utils';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    // Form state
    const username = ref('');
    const password = ref('');
    const formErrors = ref({});
    const unknownErrorOccured = ref(false);

    // Grapql mutations
    const { mutate: login } = useLoginMutation();
    const { mutate: register } = useRegisterMutation();
    const mutations = {
      login,
      register,
    };

    // Handle text displayed in form
    const action = ref('login');
    const title = computed(() =>
      action.value === 'login' ? 'Log In' : 'Register',
    );
    const linkData = computed(() => {
      const mainText =
        action.value === 'login'
          ? "Don't have an account yet?"
          : 'Already have an account?';
      const linkText =
        action.value === 'login' ? 'Register here' : 'Login here';

      return {
        mainText,
        linkText,
      };
    });

    // Form actions
    const toggleAction = () => {
      if (action.value === 'register') action.value = 'login';
      else action.value = 'register';
    };
    const onSubmit = async () => {
      // Reset errors
      formErrors.value = {};
      unknownErrorOccured.value = false;

      try {
        const response = await mutations[action.value](
          {
            username: username.value,
            password: password.value,
          },
          {
            update: (cache, { data }) => {
              cache.writeQuery({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data[action.value].user,
                },
              });
            },
          },
        );
        const { errors, user } = response.data[action.value];
        formErrors.value = formatErrors(errors);

        if (!errors) {
          localStorage.setItem('username', user.username);
          router.push('/');
        }
      } catch (e) {
        unknownErrorOccured.value = true;
      }
    };

    return {
      username,
      password,
      formErrors,
      unknownErrorOccured,
      linkData,
      title,
      action,
      toggleAction,
      onSubmit,
    };
  },
};
</script>

<style>
body {
  background: #4a00fb;
  background: -webkit-linear-gradient(45deg, #4a00fb 0%, #e600ff 100%);
  background: linear-gradient(45deg, #4a00fb 0%, #e600ff 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4a00fb', endColorstr='#e600ff',GradientType=1 );
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>

<style scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  text-align: center;
  background: white;
  padding: 30px;
  border-radius: 15px;
  min-width: 300px;
}
div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  height: 30px;
  padding-left: 10px;
  border: 10px solid;
  border-width: 1px;
  border-radius: 5px;
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
}

h1 {
  color: #4b1c99;
}

button {
  margin-top: 20px;
  background: blueviolet;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
}

.inputField {
  margin-bottom: 20px;
}

.link {
  color: #4b1c99;
  font-size: 0.9em;
}

.linkText {
  font-size: 0.8em;
  cursor: pointer;
}

.linkText:hover {
  color: darkslateblue;
  font-size: 0.9em;
}

.error {
  color: red;
  padding: 3px 7px;
  font-size: 0.8em;
  margin-top: 5px;
  text-align: center;
}
</style>
