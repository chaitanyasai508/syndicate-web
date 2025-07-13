import React, { useEffect, useRef } from 'react';
import {Button} from './ui/button';
import FadeIn from './ui/FadeIn';

// Icon components with proper SVG structure
const InvestorIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#FFD98C" fill="none" strokeWidth="2"/>
  </svg>
);

const ProspectIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12">
    <circle cx="12" cy="8" r="3" stroke="#FFD98C" fill="none" strokeWidth="2"/>
    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="#FFD98C" fill="none" strokeWidth="2"/>
    <path d="M9 12h6M9 16h6" stroke="#FFD98C" strokeWidth="2"/>
  </svg>
);

const MoneyIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12">
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="#FFD98C" fill="none" strokeWidth="2"/>
  </svg>
);

// Fewer, well-distributed nodes
const nodes = [
  // Top row
  { id: 1, x: 10, y: 10, Icon: InvestorIcon, type: 'Investor' },
  { id: 2, x: 30, y: 15, Icon: ProspectIcon, type: 'Prospect' },
  { id: 3, x: 50, y: 10, Icon: MoneyIcon, type: 'Transaction' },
  { id: 4, x: 70, y: 15, Icon: InvestorIcon, type: 'Investor' },
  { id: 5, x: 90, y: 10, Icon: ProspectIcon, type: 'Prospect' },

  // Second row
  { id: 6, x: 15, y: 30, Icon: MoneyIcon, type: 'Transaction' },
  { id: 7, x: 35, y: 25, Icon: InvestorIcon, type: 'Investor' },
  { id: 8, x: 55, y: 30, Icon: ProspectIcon, type: 'Prospect' },
  { id: 9, x: 75, y: 25, Icon: MoneyIcon, type: 'Transaction' },
  { id: 10, x: 85, y: 30, Icon: InvestorIcon, type: 'Investor' },

  // Third row
  { id: 11, x: 20, y: 45, Icon: ProspectIcon, type: 'Prospect' },
  { id: 12, x: 40, y: 50, Icon: MoneyIcon, type: 'Transaction' },
  { id: 13, x: 60, y: 45, Icon: InvestorIcon, type: 'Investor' },
  { id: 14, x: 80, y: 50, Icon: ProspectIcon, type: 'Prospect' },

  // Fourth row
  { id: 15, x: 10, y: 65, Icon: MoneyIcon, type: 'Transaction' },
  { id: 16, x: 30, y: 70, Icon: InvestorIcon, type: 'Investor' },
  { id: 17, x: 50, y: 65, Icon: ProspectIcon, type: 'Prospect' },
  { id: 18, x: 70, y: 70, Icon: MoneyIcon, type: 'Transaction' },
  { id: 19, x: 90, y: 65, Icon: InvestorIcon, type: 'Investor' },

  // Bottom row
  { id: 20, x: 15, y: 85, Icon: ProspectIcon, type: 'Prospect' },
  { id: 21, x: 35, y: 90, Icon: MoneyIcon, type: 'Transaction' },
  { id: 22, x: 55, y: 85, Icon: InvestorIcon, type: 'Investor' },
  { id: 23, x: 75, y: 90, Icon: ProspectIcon, type: 'Prospect' },
  { id: 24, x: 85, y: 85, Icon: MoneyIcon, type: 'Transaction' },

  // Add left-middle and right-middle nodes
  { id: 25, x: 2, y: 40, Icon: InvestorIcon, type: 'Investor' }, // left-middle
  { id: 26, x: 98, y: 60, Icon: ProspectIcon, type: 'Prospect' }, // right-middle
];

// Clean, logical connections
const connections = [
  // Horizontal connections
  { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 5 },
  { from: 6, to: 7 }, { from: 7, to: 8 }, { from: 8, to: 9 }, { from: 9, to: 10 },
  { from: 11, to: 12 }, { from: 12, to: 13 }, { from: 13, to: 14 },
  { from: 15, to: 16 }, { from: 16, to: 17 }, { from: 17, to: 18 }, { from: 18, to: 19 },
  { from: 20, to: 21 }, { from: 21, to: 22 }, { from: 22, to: 23 }, { from: 23, to: 24 },

  // Vertical connections
  { from: 1, to: 6 }, { from: 2, to: 7 }, { from: 3, to: 8 }, { from: 4, to: 9 }, { from: 5, to: 10 },
  { from: 6, to: 11 }, { from: 7, to: 12 }, { from: 8, to: 13 }, { from: 9, to: 14 },
  { from: 11, to: 15 }, { from: 12, to: 16 }, { from: 13, to: 17 }, { from: 14, to: 18 },
  { from: 15, to: 20 }, { from: 16, to: 21 }, { from: 17, to: 22 }, { from: 18, to: 23 }, { from: 19, to: 24 },

  // Some diagonal connections for variety
  { from: 1, to: 7 }, { from: 3, to: 9 }, { from: 5, to: 10 },
  { from: 11, to: 16 }, { from: 13, to: 18 }, { from: 17, to: 22 },
  { from: 2, to: 12 }, { from: 4, to: 14 }, { from: 8, to: 17 },

  // Add connections for left-middle and right-middle nodes
  { from: 25, to: 11 }, // left-middle to middle-left
  { from: 26, to: 14 }, // right-middle to middle-right
];

const NetworkAnimation = () => {
  const svgRef = useRef(null);

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden" style={{
      background: 'linear-gradient(167.85deg, #232323 0.69%, #000000 100%)'
    }}>
      {/* Stronger overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none rounded-2xl" />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%)'
        }}
      />
      {/* Optional: Subtle noise */}
      {/* <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          backgroundImage: 'url("data:image/svg+xml;utf8,<svg ...noise pattern here...")',
          opacity: 0.15
        }}
      /> */}
      {/* Subtle background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-yellow-300 rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <style>
            {`
              @keyframes twinkle {
                0%, 100% { opacity: 0.1; }
                50% { opacity: 0.3; }
              }

              .network-node {
                animation: gentle-pulse 4s ease-in-out infinite;
                transform-origin: center;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .network-node:hover {
                transform: scale(1.2);
                filter: drop-shadow(0 0 2px #FFD98C);
              }

              .connection-line {
                stroke: #FFD98C;
                stroke-width: 0.15;
                opacity: 0.4;
                stroke-dasharray: 0.3 0.3;
                animation: data-flow 8s linear infinite;
              }

              .node-glow {
                fill: rgba(255, 217, 140, 0.1);
                stroke: #FFD98C;
                stroke-width: 0.1;
                opacity: 0.6;
              }

              @keyframes gentle-pulse {
                0%, 100% {
                  transform: scale(1);
                  opacity: 0.8;
                }
                50% {
                  transform: scale(1.05);
                  opacity: 1;
                }
              }

              @keyframes data-flow {
                0% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: 6; }
              }

              .data-packet {
                fill: #FFD98C;
                opacity: 0.8;
                animation: packet-travel 6s linear infinite;
              }

              @keyframes packet-travel {
                0% { opacity: 0; }
                10% { opacity: 0.8; }
                90% { opacity: 0.8; }
                100% { opacity: 0; }
              }
            `}
          </style>

          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="0.3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 217, 140, 0.3)"/>
            <stop offset="100%" stopColor="rgba(255, 217, 140, 0.1)"/>
          </radialGradient>
        </defs>

        {/* Connection lines with animated data flow */}
        {connections.map((conn, index) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          return (
            <g key={`connection-${index}`}>
              <line
                className="connection-line"
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                style={{ animationDelay: `${index * 0.2}s` }}
              />

              {/* Data packets - only on some connections */}
              {index % 4 === 0 && (
                <circle
                  className="data-packet"
                  r="0.3"
                  style={{
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <animateMotion
                    dur="6s"
                    repeatCount="indefinite"
                    begin={`${index * 0.5}s`}
                  >
                    <mpath href={`#path-${index}`}/>
                  </animateMotion>
                </circle>
              )}

              <path
                id={`path-${index}`}
                d={`M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`}
                fill="none"
                stroke="none"
              />
            </g>
          );
        })}

        {/* Network nodes */}
        {nodes.map((node, index) => (
          <g key={node.id} className="network-node" style={{ animationDelay: `${index * 0.1}s` }}>
            {/* Node background glow */}
            <circle
              className="node-glow"
              cx={node.x}
              cy={node.y}
              r="1.2"
              fill="url(#nodeGradient)"
              filter="url(#soft-glow)"
            />

            {/* Main node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r="1"
              fill="rgba(30, 30, 50, 0.8)"
              stroke="#FFD98C"
              strokeWidth="0.1"
            />

            {/* Icon */}
            <foreignObject
              x={node.x - 0.6}
              y={node.y - 0.6}
              width="1.2"
              height="1.2"
              className="pointer-events-none"
            >
              <div className="flex items-center justify-center w-full h-full">
                <node.Icon />
              </div>
            </foreignObject>

            {/* Node type label */}
            <text
              x={node.x}
              y={node.y + 2}
              textAnchor="middle"
              fontSize="0.6"
              fill="#FFD98C"
              opacity="1"
              className="pointer-events-none"
            >
              {node.type}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const networkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (networkRef.current) {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;
        const moveX = (clientX / innerWidth - 0.5) * 30;
        const moveY = (clientY / innerHeight - 0.5) * 30;
        networkRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };
    // window.addEventListener('mousemove', handleMouseMove);
    // return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative flex-1 flex items-center justify-center text-center">
      <div ref={networkRef} className="absolute inset-[30px] top-[10px] opacity-40 transition-transform duration-300 ease-out rounded-xl">
        <NetworkAnimation />
      </div>


      <div className="relative z-10 container mx-auto px-6">
        <FadeIn>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FFD98C] leading-tight font-poppins">
            Connecting People,<br /> Creating Businesses
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            AI-powered platform for business matchmaking, partnerships, and growth.
          </p>
        </FadeIn>
        <FadeIn delay={400}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* <Button variant="primary" className="w-full sm:w-auto">Get Started</Button> */}
            <a href="#how-it-works">
              <Button variant="secondary" className="w-full sm:w-auto">See How It Works</Button>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;