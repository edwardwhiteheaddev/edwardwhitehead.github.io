import { Container, Text, Title } from '@mantine/core';
import classes from './HeroImageRight.module.css';

interface HeroImageRightProps {
    // Define any props if needed in the future
    title: string;
    description: string;
    image: string;
}

export function HeroImageRight(props: HeroImageRightProps) {
    return (
        <div className={classes.root} style={{ backgroundImage: `url(${props.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Container size="lg">
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            <Text
                                component="span"
                                inherit
                                variant="gradient"
                                gradient={{ from: 'pink', to: 'yellow' }}
                            >
                                {props.title}
                            </Text>
                        </Title>

                        <Text className={classes.description} mt={30}>
                            {props.description}
                        </Text>
                    </div>
                </div>
            </Container>
        </div>
    );
}