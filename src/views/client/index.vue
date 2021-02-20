<template>
  <div>
    <base-list ref="list" :action="action" :query.sync="query" primary="clientId">
      <template slot="filters">
        <el-input v-model="query.clientId" placeholder="clientId" style="width: 200px;" class="filter-item" clearable />
      </template>

      <el-table-column label="ID" prop="clientId" sortable="custom" align="center" width="100" />
      <el-table-column label="访问资源" prop="resourceId" width="150" align="center" />
      <el-table-column label="授权范围" prop="scope" width="110" align="center" />
      <el-table-column label="授权类型" width="300" align="center">
        <template slot-scope="{row}">
          <el-tag v-for="(v, idx) in row.authorizedGrantTypes.split(',')" :key="idx">
            {{ grantTypes[v] }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="跳转URL" prop="webServerRedirectUri" align="center" />
      <el-table-column label="权限" prop="authorities" align="center" />
      <el-table-column label="访问令牌时间" prop="accessTokenValidity" align="center" />
      <el-table-column label="刷新令牌时间" prop="refreshTokenValidity" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="text" @click="showProcessor(row)">编辑</el-button>
        </template>
      </el-table-column>
    </base-list>

    <el-dialog title="编辑应用" :visible.sync="editorVisible" width="500px">
      <el-form ref="submitForm" :model="selectRow" label-position="left" label-width="70px">
        <el-form-item label="访问资源" prop="resourceId" width="150">
          <el-input v-model="selectRow.resourceId" />
        </el-form-item>
        <el-form-item label="授权范围" prop="scope" width="110">
          <el-input v-model="selectRow.scope" />
        </el-form-item>
        <el-form-item label="授权类型">
          <el-checkbox-group
            v-model="selectRow.grantTypeArr"
          >
            <el-checkbox v-for="(v, k) in grantTypes" :key="k" :label="k">{{ v }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="跳转URL" prop="webServerRedirectUri">
          <el-input v-model="selectRow.webServerRedirectUri" />
        </el-form-item>
        <el-form-item label="权限" prop="authorities">
          <el-input v-model="selectRow.authorities" />
        </el-form-item>
        <el-form-item label="访问令牌时间" prop="accessTokenValidity" :rules="[{required:true, type:'number', message:'访问令牌时间错误'}]">
          <el-input v-model="selectRow.accessTokenValidity" />
        </el-form-item>
        <el-form-item label="刷新令牌时间" prop="refreshTokenValidity" :rules="[{required:true, type:'number', message:'刷新令牌时间错误'}]">
          <el-input v-model="selectRow.refreshTokenValidity" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, updateClient } from '@/api/client'

export default {
  name: 'ClientIndex',
  data() {
    return {
      action: fetchList,
      editorVisible: false,
      selectRow: {},
      grantTypes: {
        'password': '密码模式',
        'authorization_code': '授权码模式',
        'implicit': '简化模式',
        'client_credentials': '客户端模式',
        'refresh_token': '刷新token'
      },
      query: {
        clientId: null
      }
    }
  },
  methods: {
    update() {
      this.$refs.submitForm.validate(valid => {
        if (valid) {
          this.selectRow.status = 1
          const { id, remark, status } = this.selectRow
          updateClient({ id, remark, status }).then((response) => {
            const { updateTime } = response.data
            this.editorVisible = false
            this.$message.success('处理成功')
            this.$refs.list.updateRow({ ...this.selectRow, updateTime })
          }).catch(reason => {
            this.$message.error(reason.message)
          })
        }
      })
    },

    showProcessor(row) {
      this.editorVisible = true
      const selectRow = this.deepcopy(row)
      selectRow.grantTypeArr = selectRow.authorizedGrantTypes.split(',')
      this.selectRow = selectRow
    }
  }
}
</script>

<style scoped>

</style>
