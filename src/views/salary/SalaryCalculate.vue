<template>
  <BasicModal>
    <div style="margin: 10px 20px 20px">
      <Select v-model="selectedMonthYear" :style="{ width: '150px' }" :placeholder="placeholderText">
        <option v-for="option in options" :value="option.value" :key="option.value">
          {{ option.text }}
        </option>
      </Select>
      <a-button type="primary" @click="calculateSalary" style="margin: 10px 20px 20px">计算工资 </a-button>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Select } from 'ant-design-vue';
import { getSalary } from './SalaryCalculate.api';
import { message } from 'ant-design-vue';

const currentYearMonth = new Date().toISOString().slice(0, 7);
const selectedMonthYear = ref(currentYearMonth);
const options = ref([]);

function generatePast50YearsOptions() {
  const options = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  for (let year = currentYear; year > currentYear - 50; year--) {
    for (let month = 12; month > 0; month--) {
      // 当到达当前年份时，只添加到当前月份
      if (year === currentYear && month > currentMonth) continue;
      const monthFormatted = month.toString().padStart(2, '0');
      const yearMonth = `${year}-${monthFormatted}`;
      options.push({ text: yearMonth, value: yearMonth });
    }
  }

  return options;
}

onMounted(() => {
  options.value = generatePast50YearsOptions();
});

const placeholderText = currentYearMonth;

async function calculateSalary() {
  if (!selectedMonthYear.value) {
    console.log('No month selected');
    return;
  }
  try {
    const result = await getSalary(selectedMonthYear.value);
    message.success(result.result);
  } catch (error) {
    message.error(error.message);
  }
}
</script>
