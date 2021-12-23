import {FC, useState} from "react";
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useTapedSelector} from "../hooks/useTapedSelector";

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}

export const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent)

    const {user} = useTapedSelector(state => state.auth)

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const submitForm = () => {
        props.submit({...event, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label={'Опис події'}
                name={'description'}
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => setEvent({...event, description: e.target.value})}
                    value={event.description}
                />
            </Form.Item>
            <Form.Item
                label={'Дата події'}
                name={'date'}
                rules={[rules.required(), rules.isDateAfter('Неможна створити подію в минулому')]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                label={'Виберіть гостя'}
                name={'guests'}
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {
                        props.guests.map(guest =>
                            <Select.Option
                                key={guest.username}
                                value={guest.username}>
                                {guest.username}
                            </Select.Option>
                        )
                    }
                </Select>
            </Form.Item>
            <Row justify={'end'}>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Створити
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    )
}
