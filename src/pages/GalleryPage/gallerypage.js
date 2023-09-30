import React, { useEffect, useState } from "react";
import ABA5Gallery from "../../components/gallery/aba5gallery";
import ABA6Gallery from "../../components/gallery/aba6gallery";
import GradientHeading from "../../components/headings/gradientheading";
import { Spacer, Grid, Text, Button } from "@nextui-org/react";


export default function GalleryPage() {
    const [ABA7, setABA7] = useState(false);
    const [ABA6, setABA6] = useState(true)
    const [ABA5, setABA5] = useState(false)

    return (
        <>
            <Grid.Container
                css={{
                    jc: 'center',
                    alignItems: 'center'
                }}>
                <Spacer y={2} />
                <GradientHeading
                    heading='ABA Gallery'
                    description='Take a trip down memory lane...'
                    gradient='#163364'
                />

            </Grid.Container>

            <Grid.Container
                css={{
                    jc: 'center',
                    alignItems: 'center',
                }}>
                <Grid
                    css={{
                        padding: '10px'
                    }}>
                    <Button className="games-btn" auto rounded flat
                        onClick={() => {
                            setABA6(true)
                            setABA5(false)
                        }}>
                        <Text className="games-btn-text"
                            css={{
                                fontSize: '$md',
                                fontWeight: '$semibold',
                            }}>
                            ABA 6.0
                        </Text>
                    </Button>
                </Grid>

                <Grid
                    css={{
                        padding: '10px'
                    }}>
                    <Button auto className="games-btn" rounded flat
                        onClick={() => {
                            setABA6(false)
                            setABA5(true)
                        }}>
                        <Text className="games-btn-text"
                            css={{
                                fontSize: '$md',
                                fontWeight: '$semibold',
                            }}>
                            ABA 5.0
                        </Text>
                    </Button>
                </Grid>

            </Grid.Container>

            {ABA5 &&
                <ABA5Gallery />
            }

            {ABA6 &&
                <ABA6Gallery />
            }

        </>
    )
}