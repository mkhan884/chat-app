<template>
    <div class="card-wrapper">
      <Card class="card">
        <template #title>
          <div class="title">
              Login to your Account
          </div>
        </template>
        <template #content>
          <div class="input-group">
              <label for="username" size="small" class="labels">Username</label>
              <InputText id="username" class="input-text" v-model="usernmae" size="small" />
          </div>
          <div class="input-group">
              <label for="password" size="small" class="labels">Password</label>            
              <InputText id="password" class="input-text" v-model="password" size="small" type="password"/>
          </div>
        </template>
        <template #footer>
          <div>
              <Button id="login" size="small" label="Login" severity="secondary" />
          </div>
          <div class="message">
              <Message size="small" severity="secondary" variant="simple">Don't have an account? Register</Message>
          </div>
      </template>
      </Card>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
    data() {
      return {
          username: '',
          password: ''
      }
    },
  }
  </script>
  
  <style scoped>
  .card-wrapper {
    /* background-color: aqua; */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
  }
  .card {
    width: 25rem;
    height: fit-content;
  }
  .title{
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
  }
  .input-group{
      display: flex;
      flex-direction: column;
  }
  .labels{
      margin-bottom: 0.5rem;
      font-size: small;
  }
  .input-text{
      margin-bottom: 0.5rem;
  }
  #login{
      width: 100%;
      margin-top: 2px;
  }
  .message {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
  }
  
  
  </style>
  