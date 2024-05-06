import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../src/app/login/page';
import LoginPageLayout from "../../src/app/components/LoginPage/LoginPageLayout";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));

jest.mock('js-cookie', () => ({
    get: jest.fn(),
    set: jest.fn()
  }));

describe('Login', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        useRouter.mockImplementation(() => ({
            push: mockPush
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('redirects when user is logged in', () => {
        Cookies.get.mockReturnValue('123'); 
        render(<Login />);
        expect(mockPush).toHaveBeenCalledWith('/');  
    });

    it('renders LoginPageLayout when no user id cookie is set', () => {
        Cookies.get.mockReturnValue(undefined);
        render(<Login />);
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });
}),

describe('LoginPageLayout', () => {
    const mockPush = jest.fn();
    const mockFetch = jest.fn();
    global.fetch = mockFetch;

    it('renders the login inputs', () => {
        render(<LoginPageLayout />);
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('updates username and password fields on user input', async () => {
        render(<LoginPageLayout />);
        await userEvent.type(screen.getByPlaceholderText('Username'), 'testuser');
        await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');

        await waitFor(() => {
            expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
            expect(screen.getByDisplayValue('password123')).toBeInTheDocument();
        });
    });

    it('displays an error when attempting to submit with empty fields', async () => {
        render(<LoginPageLayout />);

        const button = screen.getByRole('button');
        userEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('All fields are necessary.')).toBeInTheDocument();
        });
    });

    global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Login failed' })
    });

    it('displays an error for failed login', async () => {
        render(<LoginPageLayout />);

        await userEvent.type(screen.getByPlaceholderText('Username'), 'testuser');
        await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');

        const button = screen.getByRole('button');
        userEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('Login failed')).toBeInTheDocument();
        });
    });
});

