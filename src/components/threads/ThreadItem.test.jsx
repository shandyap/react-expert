// src/components/threads/ThreadItem.test.jsx

import React from 'react';
import {
  describe, it, expect, vi, afterEach, // 1. Impor afterEach
} from 'vitest';
import {
  render, screen, cleanup, // 2. Impor cleanup
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ThreadItem from './ThreadItem';

/**
 * Skenario Pengujian
 */

// 3. Mocking date-fns
// Mock module 'date-fns' dan export 'formatDistance'
vi.mock('date-fns', () => ({
  formatDistance: vi.fn(() => '3 hari yang lalu'),
}));
// Mock module 'date-fns/locale' dan export 'id'
vi.mock('date-fns/locale', () => ({
  id: { code: 'id-ID' }, // Isi dengan objek palsu
}));

describe('ThreadItem component', () => {
  // 4. Tambahkan blok cleanup
  afterEach(() => {
    cleanup();
  });

  // Siapkan data props palsu
  const mockThread = {
    id: 'thread-1',
    title: 'Judul Thread Palsu',
    body: 'Ini adalah isi thread palsu.',
    category: 'react',
    createdAt: '2025-10-30T10:00:00.000Z',
    owner: { id: 'user-1', name: 'John Doe', avatar: 'avatar.jpg' },
    totalComments: 10,
    upVotesBy: ['user-2'],
    downVotesBy: [],
  };

  // Helper untuk me-render dengan Router
  const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

  // Test Case 1: Render data
  it('should render all props correctly', () => {
    // Arrange
    renderWithRouter(<ThreadItem {...mockThread} />);

    // Act
    const title = screen.getByText('Judul Thread Palsu');
    const ownerName = screen.getByText('John Doe');
    const category = screen.getByText('#react');
    const commentCount = screen.getByText('10');
    const time = screen.getByText('3 hari yang lalu');

    // Assert
    expect(title).toBeInTheDocument();
    expect(ownerName).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(commentCount).toBeInTheDocument();
    expect(time).toBeInTheDocument();
  });

  // Test Case 2: Render styling
  it('should render the category with correct styling', () => {
    // Arrange
    renderWithRouter(<ThreadItem {...mockThread} />);

    // Act
    const categoryElement = screen.getByText('#react');

    // Assert
    expect(categoryElement).toHaveClass('bg-blue-100');
    expect(categoryElement).toHaveClass('text-blue-800');
  });
});