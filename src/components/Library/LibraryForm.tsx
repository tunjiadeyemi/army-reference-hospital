/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';

interface LibraryFormProps {
  isEdit?: boolean;

  mockData?: any;
}

export default function LibraryForm({ isEdit = true, mockData }: LibraryFormProps) {
  const [formData, setFormData] = useState(() =>
    isEdit
      ? {
          bookTitle: '',
          author: '',
          isbn: '',
          genre: 'Fiction',
          language: 'English',
          issuedDate: '',
          numberOfCopies: '1'
        }
      : { ...mockData }
  );

  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isCopiesDropdownOpen, setIsCopiesDropdownOpen] = useState(false);
  const [bookCover, setBookCover] = useState<string | null>(isEdit ? null : mockData?.bookCover);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const genres = [
    'Fiction',
    'Horror',
    'Romance novel',
    'Fantasy',
    'Science fiction',
    'Mystery',
    'Dystopian',
    'Western',
    'Thriller',
    'Comedy',
    'Fable',
    'Fairy tale',
    'Literary fiction',
    'Magic realism',
    'Nonfiction',
    'Poetry',
    'Action/Adventure',
    'Contemporary fantasy',
    'Drama',
    'Epic',
    'Ghost story',
    'Historical fiction',
    'Historical',
    'Self-help',
    'Memoir and biography',
    'Children and young adult'
  ];

  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Russian',
    'Chinese',
    'Japanese',
    'Arabic',
    'Hindi',
    'Other'
  ];

  const numberOfCopies = Array.from({ length: 50 }, (_, i) => (i + 1).toString());

  const handleInputChange = (field: string, value: string) => {
    if (!isEdit) return;
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenreSelect = (genre: string) => {
    if (!isEdit) return;
    handleInputChange('genre', genre);
    setIsGenreDropdownOpen(false);
  };

  const handleLanguageSelect = (language: string) => {
    if (!isEdit) return;
    handleInputChange('language', language);
    setIsLanguageDropdownOpen(false);
  };

  const handleCopiesSelect = (copies: string) => {
    if (!isEdit) return;
    handleInputChange('numberOfCopies', copies);
    setIsCopiesDropdownOpen(false);
  };

  const handleBookCoverUpload = () => {
    if (!isEdit) return;
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEdit) return;
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') setBookCover(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!isEdit) return;
    console.log('Form data:', formData);
    console.log('Book cover:', bookCover);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">ADD BOOK</h1>
        </div>

        {/* Book Title Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">BOOK TITLE</label>
          <div className="lg:col-span-3">
            <input
              type="text"
              placeholder="Book Title"
              value={formData.bookTitle}
              onChange={(e) => handleInputChange('bookTitle', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Author Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">AUTHOR</label>
          <div className="lg:col-span-3">
            <input
              type="text"
              placeholder="Book Author"
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* ISBN Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">ISBN</label>
          <div className="lg:col-span-3">
            <input
              type="text"
              placeholder="ISBN"
              value={formData.isbn}
              onChange={(e) => handleInputChange('isbn', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Genre/Category Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">
            GENRE/
            <br />
            CATEGORY
          </label>
          <div className="lg:col-span-3 relative">
            <button
              type="button"
              onClick={() => isEdit && setIsGenreDropdownOpen(!isGenreDropdownOpen)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-left flex items-center justify-between ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            >
              <span
                className={
                  formData.genre ? (isEdit ? 'text-gray-900' : 'text-gray-600') : 'text-gray-400'
                }
              >
                {formData.genre}
              </span>
              <img
                src="/chevron-down.svg"
                alt=""
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isGenreDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isGenreDropdownOpen && isEdit && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleGenreSelect(genre)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                      formData.genre === genre ? 'bg-teal-50 text-teal-700' : ''
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Language Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">LANGUAGE</label>
          <div className="lg:col-span-3 relative">
            <button
              type="button"
              onClick={() => isEdit && setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-left flex items-center justify-between ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            >
              <span
                className={
                  formData.language ? (isEdit ? 'text-gray-900' : 'text-gray-600') : 'text-gray-400'
                }
              >
                {formData.language}
              </span>
              <img
                src="/chevron-down.svg"
                alt=""
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isLanguageDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isLanguageDropdownOpen && isEdit && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {languages.map((language) => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => handleLanguageSelect(language)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                      formData.language === language ? 'bg-teal-50 text-teal-700' : ''
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Book Cover Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">BOOK COVER</label>
          <div className="lg:col-span-3">
            <div
              onClick={isEdit ? handleBookCoverUpload : undefined}
              className={`w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center transition-colors ${
                isEdit
                  ? 'cursor-pointer hover:border-gray-400 hover:bg-gray-50'
                  : 'bg-gray-50 cursor-not-allowed'
              }`}
            >
              {bookCover ? (
                <img src={bookCover} alt="Book cover" className="h-full w-auto rounded" />
              ) : (
                <>
                  <img src="/upload-icon.svg" alt="" className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-gray-400 text-sm">
                    {isEdit ? 'Upload here' : 'No cover uploaded'}
                  </span>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={!isEdit}
            />
          </div>
        </div>

        {/* Issued Date Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">ISSUED DATE</label>
          <div className="lg:col-span-3 relative">
            <input
              type="date"
              value={formData.issuedDate}
              onChange={(e) => handleInputChange('issuedDate', e.target.value)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            />
            <img
              src="/unitBible/calendar-icon.svg"
              alt=""
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
            />
          </div>
        </div>

        {/* Number of Copies Field */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <label className="text-gray-700 font-medium text-right">
            NUMBERS OF
            <br />
            COPIES
          </label>
          <div className="lg:col-span-3 relative">
            <button
              type="button"
              onClick={() => isEdit && setIsCopiesDropdownOpen(!isCopiesDropdownOpen)}
              disabled={!isEdit}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-left flex items-center justify-between ${
                !isEdit ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
              }`}
            >
              <span
                className={
                  formData.numberOfCopies
                    ? isEdit
                      ? 'text-gray-900'
                      : 'text-gray-600'
                    : 'text-gray-400'
                }
              >
                {formData.numberOfCopies}
              </span>
              <img
                src="/chevron-down.svg"
                alt=""
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isCopiesDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isCopiesDropdownOpen && isEdit && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {numberOfCopies.map((copies) => (
                  <button
                    key={copies}
                    type="button"
                    onClick={() => handleCopiesSelect(copies)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                      formData.numberOfCopies === copies ? 'bg-teal-50 text-teal-700' : ''
                    }`}
                  >
                    {copies}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={handleSave}
            disabled={!isEdit}
            className={`px-12 py-3 font-medium rounded-lg transition-colors ${
              isEdit
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
