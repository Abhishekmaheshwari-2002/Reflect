"use client";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import testimonialdata from "@/data/testimonialdata";
import { Card, CardContent } from "./ui/card";

const Testimonial = () => {
    return (
        <div className="mt-24">
            <h2 className="text-3xl font-bold text-center text-orange-900 mb-12">
                What Our Authors Say
            </h2>

            <Carousel
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
            >
                <CarouselContent>
                    {testimonialdata.map((testimonial, index) => {
                        return (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <Card className="bg-white/80 backdrop-blur-sm">
                                    <CardContent className="p-6">
                                        <blockquote className="space-y-4">
                                            <p className="text-orange-700 italic">
                                                &quot;{testimonial.text}&quot;
                                            </p>
                                            <footer>
                                                <div className="font-semibold text-orange-900">
                                                    {testimonial.author}
                                                </div>
                                                <div className="text-sm text-orange-600">
                                                    {testimonial.role}
                                                </div>
                                            </footer>
                                        </blockquote>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
            </Carousel>
        </div>
    );
};

export default Testimonial;
