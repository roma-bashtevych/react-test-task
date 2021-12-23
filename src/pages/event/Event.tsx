import {FC, useEffect, useState} from "react";
import {EventCalendar} from "../../components/EventCalendar";
import {Button, Layout, Modal, Row} from "antd";
import {EventForm} from "../../components/EventForm";
import {useActions} from "../../hooks/useActions";
import {useTapedSelector} from "../../hooks/useTapedSelector";
import {IEvent} from "../../models/IEvent";

export const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const {fetchGuest, createEvent, fetchEvents} = useActions();
    const {guests, events} = useTapedSelector(state => state.event)
    const {user} = useTapedSelector(state => state.auth)

    useEffect(() => {
        fetchGuest()
        fetchEvents(user.username)
    }, [])

    const addNewEvent = (event: IEvent) => {
        createEvent(event)
        setModalVisible(false)
    }
    return (
        <Layout>

            <EventCalendar events={events}/>
            <Row justify={'center'}>
                <Button onClick={() => setModalVisible(true)}>
                    Додати подію
                </Button>
            </Row>
            <Modal
                title={'Додати подію'}
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <EventForm
                    guests={guests}
                    submit={addNewEvent}
                                   />
            </Modal>
        </Layout>
    )
}
