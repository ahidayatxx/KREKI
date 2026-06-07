import React from 'react';

export interface SlideProps {
  isActive: boolean;
  goToNext?: () => void;
}

export interface SlideDefinition {
  id: string;
  title: string;
  component: React.FC<SlideProps>;
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  cost: number;
  cumulativeProfit: number;
}

export interface RiskItem {
  name: string;
  prob: number; // 0-100
  impact: number; // 0-100
  category: string;
}

export interface ScoreItem {
  id: number;
  category: string;
  weight: number;
  score: number;
}