import React from 'react'
import Subscriber from './Subscriber'
import {
    Grid,
    useToast,
    Dialog,
    Box,
    Container,
    Card,
    Flex,
    Heading,
    Stack,
    Text,
    Button,
    Spinner,
    TextInput,
} from "@sanity/ui";
import Chat from './Chat';

const Dashboard = () => {
    return (
        <Container>
            <Grid columns={[1, 1, 2, 2]} rows={[2, 2, 1, 1]} gap={[1, 1, 2, 3]} padding={4}>
                <Subscriber />
                <Chat />
            </Grid>
        </Container>
    );
}

export default Dashboard;