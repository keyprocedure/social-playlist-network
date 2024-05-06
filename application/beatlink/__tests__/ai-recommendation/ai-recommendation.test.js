import { render, fireEvent, waitFor } from '@testing-library/react';
import SongRecommendation from '../../src/app/api/songrecommendation/route';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('js-cookie');

describe('songrecommendation', () => {
  const mockPush = jest.fn();
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    useRouter.mockImplementation(() => ({ push: mockPush }));
    Cookies.get.mockReturnValue('123'); // Mock user ID
    mockFetch.mockClear().mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          data: { songs: ['Song A', 'Song B', 'Song C'] }
        })
      })
    );
  });

  it('should make an API call and render recommendations when input is submitted', async () => {
    const { getByPlaceholderText, getByRole } = render(<SongRecommendation />);
    const userInput = getByPlaceholderText('Enter genre or mood');
    const recommendButton = getByRole('button', { name: 'Recommend Songs' });
    
    fireEvent.change(userInput, { target: { value: 'chill' } });
    fireEvent.click(recommendButton);

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(mockFetch).toHaveBeenCalledWith('/api/songrecommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        genreOrMood: 'chill',
        userId: '123'
      }),
    });

    await waitFor(() => {
      expect(getByRole('list')).toBeInTheDocument();
      expect(getByRole('listitem', { name: 'Song A' })).toBeInTheDocument();
    });
  });
});
