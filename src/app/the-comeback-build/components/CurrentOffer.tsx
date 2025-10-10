import { CurrentOfferData } from "@/schemas";
import { Badge, Button, Grid, GridCol, SimpleGrid, Text, Title } from "@mantine/core";

export function CurrentOfferSection({ title, description, offers, offerIncludes }: CurrentOfferData) {
    return (
        <div className="current-offer wrapper kyros-section__alt">
            <div className="current-offer__container">
                <Grid gutter={80}>
                    <GridCol span={{ base: 12, md: 5 }}>
                        <div data-aos="fade-up" data-aos-delay="0">
                            <Title className="current-offer__title" order={2}>
                                {title}
                            </Title>
                            <Text className="current-offer__description">
                                {description}
                            </Text>

                            <Button
                                variant="gradient"
                                gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
                                size="lg"
                                radius="md"
                                mt="xl"
                                className="current-offer__cta"
                                component="a"
                                href="https://calendar.app.google/LWH7Ad8sTZsD2CnC7"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Book a Free Consultation
                            </Button>
                        </div>
                    </GridCol>
                    <GridCol span={{ base: 12, md: 7 }}>
                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
                            {offers.map((offer, index) => {
                                const icons = ["fa-rocket", "fa-bolt", "fa-cogs", "fa-shield"];
                                const icon = icons[index % icons.length];
                                return (
                                    <div key={index} className="current-offer__card" data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                                        <div className="current-offer__card-icon">
                                            <i className={`fa ${icon}`} aria-hidden="true" />
                                        </div>
                                        <div className="current-offer__card-header">
                                            <Title order={4} className="current-offer__card-title">
                                                {offer.title}
                                            </Title>
                                            <Text className="current-offer__card-includes" c="dimmed">
                                                {offer.includes}
                                            </Text>
                                        </div>
                                        <div className="current-offer__card-cost">
                                            <Badge variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} radius="sm" size="lg">
                                                {'$'}{offer.cost}
                                            </Badge>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="current-offer__card current-offer__card--note" data-aos="fade-up" data-aos-delay={(offers.length + 1) * 100}>
                                <div className="current-offer__card-header">
                                    <Text className="current-offer__card-includes" c="dimmed" ta="center">
                                        {offerIncludes}
                                    </Text>
                                </div>
                            </div>
                        </SimpleGrid>
                    </GridCol>
                </Grid>
            </div>
        </div>
    );
}