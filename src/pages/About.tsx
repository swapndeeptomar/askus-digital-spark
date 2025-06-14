import React from 'react';
import { Trophy, Users, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const About = () => {
  const storyAnimation = useScrollAnimation({
    threshold: 0.2,
    direction: 'right'
  });
  
  const statsAnimation = useScrollAnimation({
    threshold: 0.2,
    direction: 'up',
    delay: 200
  });
  
  const missionAnimation = useScrollAnimation({
    threshold: 0.2,
    direction: 'left',
    delay: 100
  });
  
  const visionAnimation = useScrollAnimation({
    threshold: 0.2,
    direction: 'right',
    delay: 200
  });
  
  const valueAnimation1 = useScrollAnimation({
    threshold: 0.2,
    direction: 'up',
    delay: 0
  });
  
  const valueAnimation2 = useScrollAnimation({
    threshold: 0.2,
    direction: 'up',
    delay: 150
  });
  
  const valueAnimation3 = useScrollAnimation({
    threshold: 0.2,
    direction: 'up',
    delay: 300
  });
  
  const valueAnimation4 = useScrollAnimation({
    threshold: 0.2,
    direction: 'up',
    delay: 450
  });
  
  const teamAnimation1 = useScrollAnimation({
    threshold: 0.2,
    direction: 'up',
    delay: 0
  });
  
  const teamAnimation2 = useScrollAnimation({
    threshold: 0.2,
    direction: 'up',
    delay: 100
  });
  
  const teamAnimation3 = useScrollAnimation({
    threshold: 0.2,
    direction: 'up',
    delay: 200
  });
  
  const teamAnimation4 = useScrollAnimation({
    threshold: 0.2,
    direction: 'up',
    delay: 300
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
    
      {/* Header */}
      <section className="pt-32 pb-16 gradient-bg text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">About Us</h1>
            <p className="text-lg md:text-xl text-gray-100">
              Learn more about DigiSphere and our mission to deliver exceptional digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://ik.imagekit.io/0juszdika/images/_421dcb59-fed4-4e7d-a602-57786bf36f2a.jfif?updatedAt=1748348332151" 
                alt="AskUS Team" 
                className="rounded-xl shadow-xl w-full transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
              />
            </div>
            
            <div 
              ref={storyAnimation.ref}
              className={cn(
                storyAnimation.isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 translate-x-16"
              )}
              style={{
                transitionDuration: `${storyAnimation.duration}ms`,
                transitionDelay: `${storyAnimation.delay}ms`
              }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-askus-dark">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2025, DigiSphere began with a simple mission: to help businesses harness the power of digital technology to grow and succeed. What started as a small team of passionate digital enthusiasts has evolved into a comprehensive digital solutions provider.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Over the years, we've worked with businesses of all sizes across various industries, helping them transform their digital presence and achieve their business goals. Our commitment to quality, innovation, and client satisfaction has been the cornerstone of our success.
              </p>
              
              <div 
                ref={statsAnimation.ref}
                className={cn(
                  "grid grid-cols-2 gap-6",
                  statsAnimation.isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-10"
                )}
                style={{
                  transitionDuration: `${statsAnimation.duration}ms`,
                  transitionDelay: `${statsAnimation.delay}ms`
                }}
              >
                <div className="text-center p-4 rounded-lg hover:bg-purple-50 transition-colors duration-300">
                  <div className="text-3xl font-bold text-askus-purple mb-2 transition-transform duration-300 hover:scale-110">20+</div>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
                <div className="text-center p-4 rounded-lg hover:bg-purple-50 transition-colors duration-300">
                  <div className="text-3xl font-bold text-askus-purple mb-2 transition-transform duration-300 hover:scale-110">25+</div>
                  <p className="text-gray-600">Happy Clients</p>
                </div>
                <div className="text-center p-4 rounded-lg hover:bg-purple-50 transition-colors duration-300">
                  <div className="text-3xl font-bold text-askus-purple mb-2 transition-transform duration-300 hover:scale-110">5+</div>
                  <p className="text-gray-600">Team Members</p>
                </div>
                <div className="text-center p-4 rounded-lg hover:bg-purple-50 transition-colors duration-300">
                  <div className="text-3xl font-bold text-askus-purple mb-2 transition-transform duration-300 hover:scale-110">1+</div>
                  <p className="text-gray-600">Years of Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Our Mission & Vision</h2>
            <p className="text-lg text-gray-600">
              Guided by our core values, we strive to deliver exceptional digital solutions that drive business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              ref={missionAnimation.ref}
              className={cn(
                "vision-mission-card",
                missionAnimation.isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-16"
              )}
              style={{
                transitionDuration: `${missionAnimation.duration}ms`,
                transitionDelay: `${missionAnimation.delay}ms`
              }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-askus-dark">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                To empower businesses with innovative digital solutions that drive growth, enhance customer engagement, and create lasting value in an increasingly digital world.
              </p>
              <p className="text-gray-600">
                We are committed to understanding each client's unique needs and delivering tailored solutions that exceed expectations and help them achieve their business objectives.
              </p>
            </div>
            
            <div 
              ref={visionAnimation.ref}
              className={cn(
                "vision-mission-card",
                visionAnimation.isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 translate-x-16"
              )}
              style={{
                transitionDuration: `${visionAnimation.duration}ms`,
                transitionDelay: `${visionAnimation.delay}ms`
              }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-askus-dark">Our Vision</h3>
              <p className="text-gray-600 mb-4">
                To be the leading digital solutions provider known for excellence, innovation, and client satisfaction, helping businesses of all sizes harness the full potential of digital technology.
              </p>
              <p className="text-gray-600">
                We envision a future where every business, regardless of its size or industry, can leverage digital tools and strategies to thrive in the digital age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              These principles guide our work and interactions with clients and partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              ref={valueAnimation1.ref}
              className={cn(
                "value-card",
                valueAnimation1.isVisible 
                  ? "opacity-100 transform-none" 
                  : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDuration: `${valueAnimation1.duration}ms`,
                transitionDelay: `${valueAnimation1.delay}ms`
              }}
            >
              <div className="value-icon">
                <Trophy size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">Excellence</h3>
              <p className="text-gray-600">We strive for excellence in everything we do, maintaining the highest standards of quality and professionalism.</p>
            </div>
            
            <div 
              ref={valueAnimation2.ref}
              className={cn(
                "value-card",
                valueAnimation2.isVisible 
                  ? "opacity-100 transform-none" 
                  : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDuration: `${valueAnimation2.duration}ms`,
                transitionDelay: `${valueAnimation2.delay}ms`
              }}
            >
              <div className="value-icon">
                <Users size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">Collaboration</h3>
              <p className="text-gray-600">We believe in the power of collaboration, working closely with our clients and within our team to achieve the best results.</p>
            </div>
            
            <div 
              ref={valueAnimation3.ref}
              className={cn(
                "value-card",
                valueAnimation3.isVisible 
                  ? "opacity-100 transform-none" 
                  : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDuration: `${valueAnimation3.duration}ms`,
                transitionDelay: `${valueAnimation3.delay}ms`
              }}
            >
              <div className="value-icon">
                <Clock size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">Reliability</h3>
              <p className="text-gray-600">We pride ourselves on being reliable partners, delivering on our promises and meeting deadlines consistently.</p>
            </div>
            
            <div 
              ref={valueAnimation4.ref}
              className={cn(
                "value-card",
                valueAnimation4.isVisible 
                  ? "opacity-100 transform-none" 
                  : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDuration: `${valueAnimation4.duration}ms`,
                transitionDelay: `${valueAnimation4.delay}ms`
              }}
            >
              <div className="value-icon">
                <Target size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">Innovation</h3>
              <p className="text-gray-600">We embrace innovation and creativity, constantly exploring new technologies and approaches to deliver cutting-edge solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              Our talented team of digital experts is the heart of DigiSphere.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              ref={teamAnimation1.ref}
              className={cn(
                "team-card",
                teamAnimation1.isVisible 
                  ? "opacity-100 transform-none" 
                  : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDuration: `${teamAnimation1.duration}ms`,
                transitionDelay: `${teamAnimation1.delay}ms`
              }}
            >
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img
                  src="https://files.idyllic.app/files/static/3781821?width=256&optimizer=image"
                  alt="John Smith"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-askus-dark"> Allen Woods</h3>
                <p className="text-askus-purple mb-3">CEO & Founder</p>
                <p className="text-gray-600 text-sm">
                   Allen leads our team with vision and expertise.
                </p>
              </div>
              <div className="team-social">
                <a href="#" className="team-social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
                <a href="#" className="team-social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div 
              ref={teamAnimation2.ref}
              className={cn(
                "team-card",
                teamAnimation2.isVisible 
                  ? "opacity-100 transform-none" 
                  : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDuration: `${teamAnimation2.duration}ms`,
                transitionDelay: `${teamAnimation2.delay}ms`
              }}
            >
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img
                  src="https://files.idyllic.app/files/static/3781819"
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-askus-dark">Richard Mille</h3>
                <p className="text-askus-purple mb-3">Co Founder</p>
                <p className="text-gray-600 text-sm">
                  Richard oversees all technical aspects of our projects, ensuring we deliver cutting-edge solutions.
                </p>
              </div>
              <div className="team-social">
                <a href="#" className="team-social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
                <a href="#" className="team-social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div 
              ref={teamAnimation3.ref}
              className={cn(
                "team-card",
                teamAnimation3.isVisible 
                  ? "opacity-100 transform-none" 
                  : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDuration: `${teamAnimation3.duration}ms`,
                transitionDelay: `${teamAnimation3.delay}ms`
              }}
            >
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img
                  src="https://files.idyllic.app/files/static/3781792"
                  alt="Michael Chen"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-askus-dark">John Doe</h3>
                <p className="text-askus-purple mb-3">Co Founder</p>
                <p className="text-gray-600 text-sm">
                  John brings creativity and innovation to all our design projects, creating stunning visual experiences.
                </p>
              </div>
              <div className="team-social">
                <a href="#" className="team-social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </a>
                <a href="#" className="team-social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div 
              ref={teamAnimation4.ref}
              className={cn(
                "team-card",
                teamAnimation4.isVisible 
                  ? "opacity-100 transform-none" 
                  : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDuration: `${teamAnimation4.duration}ms`,
                transitionDelay: `${teamAnimation4.delay}ms`
              }}
            >
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img
                  src="https://files.idyllic.app/files/static/3782375"
                  alt="Emily Davis"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-askus-dark">Emily Davis</h3>
                <p className="text-askus-purple mb-3">Marketing Strategist</p>
                <p className="text-gray-600 text-sm">
                  Emily develops effective digital marketing strategies that help our clients reach their target audience.
                </p>
              </div>
              <div className="team-social">
                <a href="#" className="team-social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
                <a href="#" className="team-social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-askus-purple hover:bg-askus-purple/90 transition-all duration-300 hover:scale-105">
              Join Our Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
