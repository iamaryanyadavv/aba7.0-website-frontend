import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleChevronLeft,
    faCircleChevronRight,
    faCircleXmark
} from '@fortawesome/free-solid-svg-icons'
import './gallery.css'
import { Grid, Text } from '@nextui-org/react'

const ABA6Gallery = () => {

    // pull this array of urls from aws via backend

    const ABA6galleryImages = [
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0869.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0870.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0873.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0874.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0882.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0889.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0895.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0899.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0907.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0911.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0915.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0928.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0930.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0935.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0941.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0956.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0969.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0989.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0990.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_0995.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_1007.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_1012.jpg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_1020.jpeg"
        },
        {
            img: "https://abagallery.s3.ap-south-1.amazonaws.com/ABA+6.0/IMG_1027.jpg"
        },
    ]


    const [slideNumber, setSlideNumber] = useState(0)
    const [openModal, setOpenModal] = useState(false)

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

    return (
        <div>

            {openModal &&
                <div className='sliderWrap'>
                    <FontAwesomeIcon icon={faCircleXmark} className='btnClose' onClick={handleCloseModal} />
                    <FontAwesomeIcon icon={faCircleChevronLeft} className='btnPrev' onClick={prevSlide} />
                    <FontAwesomeIcon icon={faCircleChevronRight} className='btnNext' onClick={nextSlide} />
                    <div className='fullScreenImage'>
                        <img src={ABA6galleryImages[slideNumber].img} alt='' />
                    </div>
                </div>
            }

            <Grid.Container
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
                                            <img src={slide.img} alt='' />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Grid.Container>
                </Grid>
            </Grid.Container>


        </div>
    )
}

export default ABA6Gallery