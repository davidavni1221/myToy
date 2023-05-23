<template>
  <header class="main-header flex items-center justify-between">
    <div class="logo">
      <h2 class="uppercase">Toy<span class="clr-teal">App</span></h2>
    </div>
    <nav class="flex gap-2 fw-bold">
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/toy">Toy</router-link>
      <router-link class="link" to="/dashboard">Dashboard</router-link>
      <router-link class="link" to="/about">About</router-link>
      <router-link class="link" to="/login">Login</router-link>
      <router-link class="link" to="/user">User</router-link>
      <router-link class="link" to="/review">Reviews</router-link>
    </nav>
  </header>
</template>
