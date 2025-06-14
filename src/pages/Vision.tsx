import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Eye, Target, Heart, Award, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import MovingHeaderLines from "@/components/MovingHeaderLines";

const Vision = () => {
  const visionAnimation = useScrollAnimation({
    threshold: 0.2,
    direction: 'left'
  });

  const missionAnimation = useScrollAnimation({
    threshold: 0.2,
    direction: 'right',
    delay: 150
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

  const processAnimation1 = useScrollAnimation({
    threshold: 0.2,
    direction: 'left',
    delay: 0
  });

  const processAnimation2 = useScrollAnimation({
    threshold: 0.2,
    direction: 'left',
    delay: 150
  });

  const processAnimation3 = useScrollAnimation({
    threshold: 0.2,
    direction: 'left',
    delay: 300
  });

  const processAnimation4 = useScrollAnimation({
    threshold: 0.2,
    direction: 'left',
    delay: 450
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 gradient-bg text-white relative overflow-hidden">
        <MovingHeaderLines />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Our Vision & Mission</h1>
            <p className="text-lg md:text-xl text-gray-100">
              Discover what drives us forward and the values that shape our company.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div 
              ref={visionAnimation.ref} 
              className={cn(
                "vision-mission-card",
                visionAnimation.isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-16"
              )}
              style={{
                transitionDuration: `${visionAnimation.duration}ms`,
                transitionDelay: `${visionAnimation.delay}ms`
              }}
            >
              <div className="vision-mission-icon inline-block">
                <Eye size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-askus-dark">Our Vision</h2>
              <p className="text-gray-600 mb-6">
                To be the leading digital transformation partner for businesses worldwide, 
                helping them navigate the complex digital landscape with innovative solutions 
                that drive growth and success.
              </p>
              <p className="text-gray-600">
                We envision a world where businesses of all sizes can harness the power of 
                digital technologies to reach their full potential and make a meaningful impact.
              </p>
            </div>
            
            <div 
              ref={missionAnimation.ref} 
              className={cn(
                "vision-mission-card",
                missionAnimation.isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 translate-x-16"
              )}
              style={{
                transitionDuration: `${missionAnimation.duration}ms`,
                transitionDelay: `${missionAnimation.delay}ms`
              }}
            >
              <div className="vision-mission-icon inline-block">
                <Target size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-askus-dark">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                To empower businesses through cutting-edge digital solutions that enhance their 
                online presence, streamline operations, and drive meaningful customer engagement.
              </p>
              <p className="text-gray-600">
                We are committed to delivering exceptional value through innovative strategies, 
                technical excellence, and a deep understanding of our clients' business objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              These principles guide our work and define our company culture.
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
                <Award size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from the quality of our work to the service we provide to our clients.
              </p>
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
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">Innovation</h3>
              <p className="text-gray-600">
                We embrace creativity and continuously seek innovative solutions to solve complex problems and drive business growth.
              </p>
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
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">Integrity</h3>
              <p className="text-gray-600">
                We conduct our business with the highest ethical standards, honesty, and transparency in all our interactions.
              </p>
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
                <Users size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark">Collaboration</h3>
              <p className="text-gray-600">
                We believe in the power of teamwork and collaboration, both within our team and with our clients, to achieve exceptional results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              The talented professionals behind our success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <img 
                src="src/images/Leonardo_Phoenix_09_A_sleek_and_modern_design_for_AskUS_digita_2.jpg" 
                alt="Team Member" 
                className="w-full h-48 object-cover rounded-lg mb-4" 
              />
              <h3 className="text-xl font-semibold text-askus-dark">Alex Morgan</h3>
              <p className="text-askus-purple mb-3">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                Visionary leader with over 15 years of experience in digital technology.
              </p>
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
              <img 
                src="src/images/_e6f1ab64-aa5d-4734-ab3f-4a0e44626aa3.jfif" 
                alt="Team Member" 
                className="w-full h-48 object-cover rounded-lg mb-4" 
              />
              <h3 className="text-xl font-semibold text-askus-dark">Samantha Lee</h3>
              <p className="text-askus-purple mb-3">Creative Director</p>
              <p className="text-gray-600 text-sm">
                Award-winning designer with a passion for creating memorable brand experiences.
              </p>
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
              <img 
                src="src/images/_5ff173b6-d833-48c4-87c1-cd0e6b132cd4.jfif" 
                alt="Team Member" 
                className="w-full h-48 object-cover rounded-lg mb-4" 
              />
              <h3 className="text-xl font-semibold text-askus-dark">David Chen</h3>
              <p className="text-askus-purple mb-3">Tech Lead</p>
              <p className="text-gray-600 text-sm">
                Software engineer with expertise in developing scalable web applications.
              </p>
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
              <img 
                src="src/images/_ac9b5c03-2050-4ff8-9585-525284ada44e.jfif" 
                alt="Team Member" 
                className="w-full h-48 object-cover rounded-lg mb-4" 
              />
              <h3 className="text-xl font-semibold text-askus-dark">Emily Johnson</h3>
              <p className="text-askus-purple mb-3">Marketing Strategist</p>
              <p className="text-gray-600 text-sm">
                Digital marketing expert specializing in growth strategies and brand development.
              </p>
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
        </div>
      </section>

      {/* Process Section with Enhanced Animation */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-askus-dark">Our Process</h2>
            <p className="text-lg text-gray-600">
              We follow a structured approach to ensure the success of your digital projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              ref={processAnimation1.ref} 
              className={cn(
                "process-step",
                processAnimation1.isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-16"
              )}
              style={{
                transitionDuration: `${processAnimation1.duration}ms`,
                transitionDelay: `${processAnimation1.delay}ms`
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="process-number">1</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark text-center">Discovery</h3>
              <p className="text-gray-600 text-center">
                We start by understanding your business goals, target audience, and project requirements.
              </p>
            </div>
            
            <div 
              ref={processAnimation2.ref} 
              className={cn(
                "process-step",
                processAnimation2.isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-16"
              )}
              style={{
                transitionDuration: `${processAnimation2.duration}ms`,
                transitionDelay: `${processAnimation2.delay}ms`
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="process-number">2</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark text-center">Planning</h3>
              <p className="text-gray-600 text-center">
                We create a detailed project plan with timelines, milestones, and deliverables.
              </p>
            </div>
            
            <div 
              ref={processAnimation3.ref} 
              className={cn(
                "process-step",
                processAnimation3.isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-16"
              )}
              style={{
                transitionDuration: `${processAnimation3.duration}ms`,
                transitionDelay: `${processAnimation3.delay}ms`
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="process-number">3</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark text-center">Execution</h3>
              <p className="text-gray-600 text-center">
                Our team works diligently to develop and implement the solutions as per the plan.
              </p>
            </div>
            
            <div 
              ref={processAnimation4.ref} 
              className={cn(
                "process-step",
                processAnimation4.isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-16"
              )}
              style={{
                transitionDuration: `${processAnimation4.duration}ms`,
                transitionDelay: `${processAnimation4.delay}ms`
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="process-number">4</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-askus-dark text-center">Delivery & Support</h3>
              <p className="text-gray-600 text-center">
                We deliver the final product and provide ongoing support to ensure its success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 gradient-bg text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Contact us today to discuss how our services can help your business grow and succeed in the digital world.
            </p>
            <Link to="/contact">
              <Button className="bg-white text-askus-purple hover:bg-gray-100 text-lg py-6 px-8 rounded-full">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Vision;
