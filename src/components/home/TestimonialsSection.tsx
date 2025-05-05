
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Verified Buyer",
    content: "These are the most comfortable shoes I've ever owned. Excellent quality and fast shipping!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Sneaker Enthusiast",
    content: "Great selection of limited edition shoes. The quality exceeds expectations and customer service is top-notch.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Casual Runner",
    content: "My running performance improved significantly with these shoes. Extremely lightweight yet durable.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop",
  },
];

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || cards.some(card => !card)) return;

    // Animate the heading
    gsap.from(".testimonial-heading", {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Animate each card with a stagger effect
    gsap.from(cards, {
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power3.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="testimonial-heading text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their PapiKicks experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="hover:shadow-lg transition-shadow duration-300 border-none bg-gray-50"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-blue-100">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-base font-medium text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">{renderStars(testimonial.rating)}</div>
                <p className="text-gray-700">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
