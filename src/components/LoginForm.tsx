import {FC, useState} from "react";
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useTapedSelector} from "../hooks/useTapedSelector";
import {useActions} from "../hooks/useActions";

export const LoginForm: FC = () => {
    const dispatch = useDispatch()
    const {error, isLoading} = useTapedSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useActions();
    const submit = () => {
        login(username, password)
    }
    return (
        <Form
            onFinish={submit}
        >
            {error && <div style={{color: 'red', fontWeight: '700', margin: '30px'}}>
                {error}
            </div>}
            <Form.Item
                label="Ваш логін"
                name="username"
                rules={[rules.required('Будь ласка введіть Ваш логін!')]}
            >
                <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Ваш пароль"
                name="password"
                rules={[rules.required('Будь ласка введіть пароль!')]}
            >
                <Input
                    type={'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                >
                    Увійти
                </Button>
            </Form.Item>

        </Form>
    )
}
