'use client';

import React from 'react';
import { X, Check, Ruler, Home, Bed, LayoutGrid } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-warmbrown-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-cream-50 rounded-2xl shadow-2xl border border-sandstone-300 overflow-hidden z-10 max-h-[90vh] overflow-y-auto animate-scale p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-sandstone-200">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-terracotta-100 text-terracotta-700">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-warmbrown-900">
                Architectural Rug Sizing Guide
              </h3>
              <p className="text-xs text-sandstone-600">
                Ensure your handcrafted Indian rug balances your furniture and room proportions.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-sandstone-500 hover:text-warmbrown-900 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Room Placement Guidelines */}
        <div className="mt-6 space-y-6">
          {/* Living Room */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-sandstone-200">
            <div className="flex items-center space-x-2 text-warmbrown-900 font-bold text-sm mb-2">
              <Home className="w-4 h-4 text-terracotta-600" />
              <span>Living Room Layouts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-sandstone-700">
              <div className="p-3 bg-sandstone-50 rounded-lg">
                <strong className="block text-warmbrown-900 mb-1">5 x 7 ft (150x215 cm)</strong>
                <p>Best for compact apartments. Anchors coffee table only while front legs of seating frame the perimeter.</p>
              </div>
              <div className="p-3 bg-sandstone-50 rounded-lg border-2 border-terracotta-200">
                <strong className="block text-terracotta-700 mb-1">8 x 10 ft (240x305 cm) ★ Most Popular</strong>
                <p>Front legs of sofa and armchairs rest on the rug. Bridges the conversation area harmoniously.</p>
              </div>
              <div className="p-3 bg-sandstone-50 rounded-lg">
                <strong className="block text-warmbrown-900 mb-1">9 x 12 ft (275x365 cm)</strong>
                <p>All furniture legs rest comfortably on rug. Defines an expansive luxury zone in open floor plans.</p>
              </div>
            </div>
          </div>

          {/* Bedroom */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-sandstone-200">
            <div className="flex items-center space-x-2 text-warmbrown-900 font-bold text-sm mb-2">
              <Bed className="w-4 h-4 text-terracotta-600" />
              <span>Bedroom Layouts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-sandstone-700">
              <div className="p-3 bg-sandstone-50 rounded-lg">
                <strong className="block text-warmbrown-900 mb-1">Queen Bed: 6x9 ft or 8x10 ft</strong>
                <p>Placed perpendicularly under bottom two-thirds of the bed, providing 2-3 feet of warm plush rug on each side.</p>
              </div>
              <div className="p-3 bg-sandstone-50 rounded-lg">
                <strong className="block text-warmbrown-900 mb-1">King Bed: 8x10 ft or 9x12 ft</strong>
                <p>Extends 2.5 to 3 feet past the foot and both sides of a king frame for barefoot morning comfort.</p>
              </div>
            </div>
          </div>

          {/* Hallways & Runners */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-sandstone-200">
            <div className="flex items-center space-x-2 text-warmbrown-900 font-bold text-sm mb-2">
              <LayoutGrid className="w-4 h-4 text-terracotta-600" />
              <span>Hallway & Stair Runners</span>
            </div>
            <p className="text-xs text-sandstone-700 leading-relaxed">
              Standard runner widths are <strong>2.5 ft (75 cm)</strong> or <strong>3 ft (90 cm)</strong>. Leave 4 to 6 inches of bare floor visible on both sides of a hallway. For stairs, our triple-density reinforced flatweaves can be custom loomed to exact stair run lengths.
            </p>
          </div>

          {/* Sizing Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-sandstone-300">
              <thead>
                <tr className="bg-sandstone-200 text-warmbrown-900 font-bold">
                  <th className="p-2.5 border border-sandstone-300">Standard Size (ft)</th>
                  <th className="p-2.5 border border-sandstone-300">Metric Equivalent (cm)</th>
                  <th className="p-2.5 border border-sandstone-300">Recommended Room Placement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sandstone-200 bg-white">
                <tr><td className="p-2 font-semibold">2 x 3 ft</td><td className="p-2">60 x 90 cm</td><td className="p-2">Entryway, powder room, bedside mat</td></tr>
                <tr><td className="p-2 font-semibold">2.5 x 8 / 10 ft</td><td className="p-2">75 x 245 / 305 cm</td><td className="p-2">Hallways, kitchen galley, staircase</td></tr>
                <tr><td className="p-2 font-semibold">3 x 5 ft</td><td className="p-2">90 x 150 cm</td><td className="p-2">Foyer, kitchen island, reading nook</td></tr>
                <tr><td className="p-2 font-semibold">4 x 6 ft</td><td className="p-2">120 x 180 cm</td><td className="p-2">Home office desk, small studio seating</td></tr>
                <tr><td className="p-2 font-semibold">5 x 7 ft</td><td className="p-2">150 x 215 cm</td><td className="p-2">Compact living room, twin bed framing</td></tr>
                <tr><td className="p-2 font-semibold">6 x 9 ft</td><td className="p-2">180 x 275 cm</td><td className="p-2">Dining room (4-6 chairs), queen bedroom</td></tr>
                <tr><td className="p-2 font-semibold">8 x 10 ft</td><td className="p-2">240 x 305 cm</td><td className="p-2">Large living room, king bedroom, 6-8 chair dining</td></tr>
                <tr><td className="p-2 font-semibold">Custom Dimension</td><td className="p-2">Bespoke</td><td className="p-2">Any irregular architectural layout or staircase</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
