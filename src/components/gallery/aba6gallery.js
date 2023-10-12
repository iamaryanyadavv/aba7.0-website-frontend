import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleChevronLeft,
    faCircleChevronRight,
    faCircleXmark
} from '@fortawesome/free-solid-svg-icons'
import './gallery.css'
import { Grid, Text } from '@nextui-org/react'

const ABA6Gallery = () => {

    const [slideNumber, setSlideNumber] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [ABA6galleryImages, setABA6GalleryImages] = useState([])

    const handleOpenModal = (index) => {
        setSlideNumber(index)
        setOpenModal(true)
    }

    // Close Modal
    const handleCloseModal = () => {
        setOpenModal(false)
    }

    // Previous Image
    const prevSlide = () => {
        slideNumber === 0
            ? setSlideNumber(ABA6galleryImages.length - 1)
            : setSlideNumber(slideNumber - 1)
    }

    // Next Image  
    const nextSlide = () => {
        slideNumber + 1 === ABA6galleryImages.length
            ? setSlideNumber(0)
            : setSlideNumber(slideNumber + 1)
    }

    useEffect(() => {
        try {
            fetch("http://localhost:3001/aba6images")
                .then(response => response.json())
                .then(data => setABA6GalleryImages(data))
                .catch(error => console.log(error));
        } catch (error) {
            console.log(error);
        }
    }, []);  

    return (
        <div>

            {openModal && ABA6galleryImages &&
                <div className='sliderWrap'>
                    <FontAwesomeIcon icon={faCircleXmark} className='btnClose' onClick={handleCloseModal} />
                    <FontAwesomeIcon icon={faCircleChevronLeft} className='btnPrev' onClick={prevSlide} />
                    <FontAwesomeIcon icon={faCircleChevronRight} className='btnNext' onClick={nextSlide} />
                    <div className='fullScreenImage'>
                        <img src={ABA6galleryImages[slideNumber]} alt='' />
                    </div>
                </div>
            }

            {ABA6galleryImages && <Grid.Container
                css={{
                    jc: 'center',
                    textAlign: 'center'
                }}>
                <Grid>
                    

                    {/* ABA 5.0 Pictures */}
                    <Grid.Container
                        css={{
                            jc: 'center',
                            textAlign: 'center',
                            margin: '30px 0px 30px 0px',
                            backgroundColor: '#faf7ea',
                            borderRadius: '20px',
                            width: '100vw'
                        }}>


                        <Text
                            css={{
                                fontSize: '$4xl',
                                fontWeight: '$semibold',
                                padding: '20px',
                                '@xsMax': {
                                    fontSize: '$2xl'
                                },
                                color: '#163364'
                            }}>
                            ABA 6.0 2022
                        </Text>

                        <div className='galleryWrap'>
                            {
                                ABA6galleryImages && ABA6galleryImages.map((slide, index) => {
                                    return (
                                        <div
                                            className='single'
                                            key={index}
                                            onClick={() => handleOpenModal(index)}
                                        >
                                            <img src={slide} alt='' />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Grid.Container>
                </Grid>
            </Grid.Container>}


        </div>
    )
}

export default ABA6Gallery