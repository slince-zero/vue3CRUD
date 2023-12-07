<template>
  <div class="warps">
    <div class="warp-header">
      <el-input
        v-model="inputContent"
        placeholder="请输入要搜索的内容"
        clearable
        style="width: 300px; margin-right: 10px"></el-input>
      <el-button @click="handleAdd">添加</el-button>
      <el-button @click="handleSearch">搜索</el-button>
    </div>
    <div class="warp-content">
      <el-table :data="tableData" stripe style="width: 700px">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-button @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 对话框 -->
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <el-form :model="dialogForm">
        <el-form-item label="姓名">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="dialogForm.description"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancle">取消</el-button>
          <el-button type="primary" @click="handleSave"> 保存 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import {
    getAllUsers,
    getUsersByName,
    deleteUser,
    addUser,
    getUserById,
    updateUser,
  } from './api/user'

  // 判断是编辑打开的对话框还是添加打开的对话框
  const isEditMode = ref(false)

  // 输入框
  const inputContent = ref('')

  // 对话框--控制对话框的显示于隐藏
  const dialogVisible = ref(false)
  // 对话框表单
  const dialogForm = reactive({
    name: '',
    description: '',
    id: 0,
  })

  // 用于存储数据库返回的数据
  const tableData = ref()

  // 初始化数据，获取后台数据库中的所有用户
  const initData = async () => {
    const res = await getAllUsers()
    tableData.value = res.data
  }
  initData()

  // 保存数据-添加保存/修改保存
  const handleSave = async () => {
    if (isEditMode.value) {
      // 添加逻辑，点击保存的时候发送添加用户请求
      await addUser(dialogForm)
      initData()
      dialogForm.name = ''
      dialogForm.description = ''
      dialogVisible.value = false
    } else {
      // 编辑逻辑，点击保存的时候发送修改用户请求
      await updateUser(dialogForm.id, dialogForm)
      initData()
      dialogForm.name = ''
      dialogForm.description = ''
      dialogVisible.value = false
    }
  }

  // 取消保存
  const handleCancle = () => {
    dialogForm.name = ''
    dialogForm.description = ''
    dialogVisible.value = false
  }

  // 添加表单信息--未保存
  const handleAdd = async () => {
    dialogVisible.value = true
    isEditMode.value = true
  }

  // 搜索表单信息
  const handleSearch = async () => {
    const res = await getUsersByName(inputContent.value)
    tableData.value = res.data
  }

  // 编辑表单信息--未保存
  const handleEdit = async (row: { id: number }) => {
    dialogVisible.value = true
    isEditMode.value = false
    const user = await getUserById(row.id)
    dialogForm.name = user.data.name
    dialogForm.description = user.data.description
    dialogForm.id = user.data.id
  }

  // 删除表单信息
  const handleDelete = async (row: { id: number }) => {
    await deleteUser(row.id)
    initData()
  }
</script>
<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  .warps {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: gray;
    .warp-header {
      margin-bottom: 20px;
    }
  }
</style>
