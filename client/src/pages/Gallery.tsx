import { useState } from 'react';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Mock gallery images - in real app, these would come from your backend
  const galleryImages = [
    { id: 1, src: "/api/placeholder/400/300", category: "Equipment", title: "State-of-the-art Equipment" },
    { id: 2, src: "/api/placeholder/400/300", category: "Training", title: "Personal Training Session" },
    { id: 3, src: "/api/placeholder/400/300", category: "Facility", title: "Main Workout Floor" },
    { id: 4, src: "/api/placeholder/400/300", category: "Classes", title: "Group HIIT Class" },
    { id: 5, src: "/api/placeholder/400/300", category: "Equipment", title: "Free Weight Section" },
    { id: 6, src: "/api/placeholder/400/300", category: "Training", title: "Powerlifting Area" },
    { id: 7, src: "/api/placeholder/400/300", category: "Facility", title: "Reception Area" },
    { id: 8, src: "/api/placeholder/400/300", category: "Classes", title: "Yoga & Stretching" },
    { id: 9, src: "/api/placeholder/400/300", category: "Equipment", title: "Cardio Zone" },
    { id: 10, src: "/api/placeholder/400/300", category: "Training", title: "Boxing Training" },
    { id: 11, src: "/api/placeholder/400/300", category: "Facility", title: "Locker Rooms" },
    { id: 12, src: "/api/placeholder/400/300", category: "Classes", title: "Strength Training" }
  ];

  const categories = ["All", "Equipment", "Training", "Facility", "Classes"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-accent">Gallery</span>
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Take a visual tour of our world-class facilities and vibrant community.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-accent text-accent-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-accent/20 hover:text-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group cursor-pointer card-gym p-0 overflow-hidden hover:shadow-strong transition-all duration-300"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded mb-2">
                      {image.category}
                    </span>
                    <h3 className="font-bold text-lg">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-20 bg-gradient-to-r from-accent to-accent-hover">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-accent-foreground mb-6">
            Want to See More?
          </h2>
          <p className="text-xl text-accent-foreground/90 mb-8 max-w-2xl mx-auto">
            Schedule a visit and experience our facilities in person. We'd love to show you around!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
              Schedule Tour
            </button>
            <button className="border-2 border-primary text-primary bg-transparent font-bold py-4 px-8 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-accent transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage}
              alt="Gallery"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;