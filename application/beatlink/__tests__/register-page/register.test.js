import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../../src/app/register/page';
import RegisterPageLayout from "../../src/app/components/RegisterPage/RegisterPageLayout";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
    })
);

jest.mock('js-cookie', () => ({
    get: jest.fn(),
    set: jest.fn()
  }));

describe('Register', () => {
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
        render(<Register />);
        expect(mockPush).toHaveBeenCalledWith('/');  
    });

    it('renders RegisterPageLayout when no user id cookie is set', () => {
        Cookies.get.mockReturnValue(undefined);
        render(<Register />);
        expect(screen.getByPlaceholderText('Birthday')).toBeInTheDocument();
    });
}),

describe('RegisterPageLayout', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        useRouter.mockImplementation(() => ({
            push: mockPush
        }));
        fetch.mockClear();
        mockPush.mockClear();
    });

    it('renders all input fields for registration', () => {
        render(<RegisterPageLayout />);
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Birthday')).toBeInTheDocument();
    });

    it('validates that all fields are necessary', async () => {
        render(<RegisterPageLayout />);
        await userEvent.type(screen.getByPlaceholderText('Email'), 'fail@example.com');
        await userEvent.type(screen.getByPlaceholderText('Username'), 'failuser');
        await userEvent.type(screen.getByPlaceholderText('Password'), 'failpass');
        
        const registerButton = screen.getByRole('button', { name: 'Register' });
        userEvent.click(registerButton);

        await waitFor(() => {
            expect(screen.getByText('All fields are necessary.')).toBeInTheDocument();
        });
    });

    it('allows setting a birthday', async () => {
        render(<RegisterPageLayout />);
        const birthdayInput = screen.getByLabelText('Birthday');
        userEvent.type(birthdayInput, '2004-04-21');
        await waitFor(() => {
            expect(birthdayInput.value).toBe('2004-04-21');
        });
    });

    it('checks for age validation (must be 13 years or older)', async () => {
        render(<RegisterPageLayout />);
        await userEvent.type(screen.getByPlaceholderText('Email'), 'fail@example.com');
        await userEvent.type(screen.getByPlaceholderText('Username'), 'failuser');
        await userEvent.type(screen.getByPlaceholderText('Password'), 'failpass');
        await userEvent.type(screen.getByLabelText('Birthday'), '2015-01-01'); 

        const registerButton = screen.getByRole('button', { name: 'Register' });
        userEvent.click(registerButton);
        
        await waitFor(() => {
            expect(screen.getByText('Must be 13 years or older.')).toBeInTheDocument();
        });
    });

    it('submits the form and redirects to login page on successful registration', async () => {
        render(<RegisterPageLayout />);
        await userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
        await userEvent.type(screen.getByPlaceholderText('Username'), 'testuser');
        await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
        await userEvent.type(screen.getByLabelText('Birthday'), '2000-01-01'); 
        
        const registerButton = screen.getByRole('button', { name: 'Register' });
        userEvent.click(registerButton);
        
        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/login');
        });
    });
});