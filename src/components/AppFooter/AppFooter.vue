<template>
  <footer
    class="h-36 flex justify-between items-center gap-2 px-25
    border-t border-t-creamy-dark"
  >
    <div>
      <Logo />
      <p class="mt-2.5 secondary text-gravel">© 2023 Wheels.com. Всі права захищені.</p>
    </div>
    <nav>
      <ul class="flex gap-14 text-black body-2">
        <li>
          <el-link>Угода про надання послуг</el-link>
        </li>
        <li>
          <el-link>Політика приватності</el-link>
        </li>
        <li>
          <el-link>Карта сайту</el-link>
        </li>
        <li>
          <el-link>finances</el-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import Logo from '@/assets/images/Logo.vue'
</script>
