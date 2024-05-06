import { render, fireEvent, waitFor } from '@testing-library/react';
import CreatePost from '../../src/app/components/CreatePost';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('js-cookie');

describe('CreatePost Component', () => {
  const mockPush = jest.fn();
  const mockFetch = global.fetch = jest.fn();

  beforeEach(() => {
    useRouter.mockImplementation(() => ({ push: mockPush }));
    Cookies.get.mockReturnValue('123'); // Mock user ID
    mockFetch.mockClear().mockImplementation(() => 
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        data: { postId: '123456' }
      })
    })
  );
  });

  it('should make an API call with correct parameters when form is submitted', async () => {
    const { getByPlaceholderText, getByRole } = render(<CreatePost />);
    const titleInput = getByPlaceholderText('Post Title');
    const linkInput = getByPlaceholderText('Spotify Playlist Link');
    const createButton = getByRole('button', { name: 'Create Post' });
    
    fireEvent.change(titleInput, { target: { value: 'My New Post' } });
    fireEvent.change(linkInput, { target: { value: 'https://open.spotify.com/playlist/123456' } });
    fireEvent.click(createButton);

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(mockFetch).toHaveBeenCalledWith('/api/createpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postTitle: 'My New Post',
        spotifyLink: 'https://open.spotify.com/playlist/123456',
        userId: '123',
        playlistId: '123456',
      }),
    });
  });
});
