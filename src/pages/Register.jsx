import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { FaUserPlus, FaArrowLeft } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'farmer',
    phone: '',
    location: '',
  });

  const { name, email, password, confirmPassword, role, phone, location } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const userData = {
      name,
      email,
      password,
      role,
      phone,
      location,
    };

    dispatch(register(userData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Create an account</h2>
            <p className="mt-2 text-sm text-gray-600">Join our platform to get started</p>
          </div>
          <Link
            to="/login"
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
            title="Back to login"
          >
            <FaArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={onChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={onChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={phone}
                onChange={onChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location (Village/District)
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={location}
                onChange={onChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="E.g., Palampur, Himachal Pradesh"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                I am a
              </label>
              <select
                id="role"
                name="role"
                required
                value={role}
                onChange={onChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="farmer">Farmer</option>
                <option value="fpo">FPO Representative</option>
                <option value="buyer">Buyer</option>
                <option value="expert">Agriculture Expert</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={onChange}
                minLength="6"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={onChange}
                minLength="6"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="terms" className="block ml-2 text-sm text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-green-600 hover:text-green-500">
                Terms and Conditions
              </a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUserPlus className="w-5 h-5 text-green-500 group-hover:text-green-400" />
              </span>
              Create Account
            </button>
          </div>
        </form>

        <div className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
            Sign in
          </Link>
        </div>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            <span className="sr-only">Sign up with Google</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15.545 8.558a4.5 4.5 0 0 1 0 2.832 4.5 4.5 0 0 1-3.17 2.485 4.5 4.5 0 0 1-5.25-2.5 4.5 4.5 0 0 1 0-3.54 4.5 4.5 0 0 1 5.25-2.5c1.12 0 2.2.4 3.04 1.12l-1.23 1.22a2.5 2.5 0 0 0-1.81-.7 2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 2.5-2.5H10v-2h5.545z" />
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            <span className="sr-only">Sign up with Aadhaar</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="M10 5a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
