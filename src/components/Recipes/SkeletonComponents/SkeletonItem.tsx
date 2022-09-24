import React from 'react';
import Skeleton from './Skeleton';
import './SkeletonItem.css';

interface SkeletonProps {
  idx: number
}

export default function SkeletonItem({ idx }: SkeletonProps) {

  return (
  <li className='list' key={idx}>
    <div className='skeleton-card'>
      <div className='shimmer'>
      <Skeleton styleContainer='thumbnail' />
      <Skeleton styleContainer='text-lg' />
      
      <Skeleton styleContainer='text-md' />
      
      <Skeleton styleContainer='text-md' />
      
      <Skeleton styleContainer='text-sm' />
      </div>
      <div className="shimmer-wrapper">
      <div className="shimmer"></div>
      </div>
    </div>
  </li>
  );
}