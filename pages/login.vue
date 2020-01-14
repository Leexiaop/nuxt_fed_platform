<template>
    <div class="login">
        <div class="content">
            <a-form
                id="components-form-demo-normal-login"
                :form="form"
                class="login-form"
                @submit="handleSubmit"
            >
                <a-form-item>
                <a-input
                    v-decorator="[
                    'username',
                    { rules: [{ required: true, message: 'Please input your username!' }] }
                    ]"
                    placeholder="Username"
                >
                    <a-icon
                    slot="prefix"
                    type="user"
                    style="color: rgba(0,0,0,.25)"
                    />
                </a-input>
                </a-form-item>
                <a-form-item>
                <a-input
                    autocomplete="password"
                    v-decorator="[
                    'password',
                    { rules: [{ required: true, message: 'Please input your Password!' }] }
                    ]"
                    type="password"
                    placeholder="Password"
                >
                    <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0,0,0,.25)"
                    />
                </a-input>
                </a-form-item>
                <a-form-item>
                <a-checkbox
                    v-decorator="[
                    'remember',
                    {
                        valuePropName: 'checked',
                        initialValue: true,
                    }
                    ]"
                >
                    Remember me
                </a-checkbox>
                <a
                    class="login-form-forgot"
                    href=""
                >
                    Forgot password
                </a>
                <a-button
                    type="primary"
                    html-type="submit"
                    class="login-form-button"
                >
                    Log in
                </a-button>
                Or <a href="">
                    register now!
                </a>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
import * as types from '~/assets/actions_types'
import Cookies from 'js-cookie'
export default {
    data () {
        return {
            form: this.$form.createForm(this)
        }
    },
    beforeCreate () {
        this.form = this.$form.createForm(this)
    },
    methods: {
        handleSubmit (e) {
            e.preventDefault();
            this.form.validateFields(async (err, values) => {
                if (!err) {
                    await this.$store.dispatch(`login/${types.LOGIN}`, values)
                    let fed_token = await this.$store.getters[`login/${types.LOGIN}`]
                    if (fed_token) {
                        this.$router.push('/')
                    } else {
                        this.$notification['error']({
                            message: '提示',
                            description: '用户名或密码错误，登录失败，请重新登录。。。',
                        })
                    }
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    // background: url('/bg.jpeg') no-repeat;
    background-size: 100% 100%;
    position: relative;
    div.content {
        width: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>