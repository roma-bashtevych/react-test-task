import {FC} from "react";
import {Layout, Menu, Row} from "antd";
import {useHistory} from 'react-router-dom'
import {RouteNames} from "../routes";
import {useTapedSelector} from "../hooks/useTapedSelector";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useActions} from "../hooks/useActions";

export const Navbar: FC = () => {
    const dispatch = useDispatch();
    const router = useHistory();
    const {isAuth, user} = useTapedSelector(state => state.auth);
    const {logout} = useActions();
    return (
        <Layout.Header>
            <Row justify={'end'}>
                {
                    isAuth ?
                        <>
                            <div style={{color: 'white'}}>
                                {user.username}
                            </div>
                            <Menu theme="dark" mode="horizontal" selectable={false}>
                                <Menu.Item
                                    onClick={logout}
                                    key={1}
                                >
                                    Вихід
                                </Menu.Item>
                            </Menu>
                        </>
                        :
                        <Menu theme={'dark'} mode={'horizontal'} selectable={false}>
                            <Menu.Item
                                onClick={() => router.push(RouteNames.LOGIN)}
                                key={1}
                            >
                                Логінація
                            </Menu.Item>
                        </Menu>
                }
            </Row>
        </Layout.Header>
    )
}
