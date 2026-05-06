import { useState, useCallback } from 'react';
import { emailApi } from '../services/api.js';
import toast from 'react-hot-toast';

export const useEmailAssistant = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [processingTime, setProcessingTime] = useState(null);

  const processEmail = useCallback(async (requestData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await emailApi.processEmail(requestData);

      if (response.success) {
        setResult(response.result);
        setProcessingTime(response.processingTimeMs);
        toast.success('Email processed successfully!', {
          style: {
            background: '#12121f',
            color: '#f0eeff',
            border: '1px solid rgba(94,234,212,0.3)',
          },
          iconTheme: { primary: '#5eead4', secondary: '#080810' },
        });
      } else {
        throw new Error(response.error || 'Processing failed');
      }
    } catch (err) {
      const errorMessage = err.message || 'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage, {
        style: {
          background: '#12121f',
          color: '#f0eeff',
          border: '1px solid rgba(248,113,113,0.3)',
        },
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
    setProcessingTime(null);
  }, []);

  return { loading, result, error, processingTime, processEmail, clearResult };
};
