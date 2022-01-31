import React from 'react';

import { Button } from './Buttons';

import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import { updateLanguage } from '../app/appSlice';
import { useModalContext } from './ModalContext';

function LanguageChangeForm(props) {
    const context = useModalContext();

    const languages = new Map([
        ['en', { fullName: 'English', shortName: 'en' }],
        ['tr', { fullName: 'Turkish', shortName: 'tr' }],
    ])

    const dispatch = useDispatch();

    const { language } = useSelector((state) => state.app);
    const [currentLanguage, setCurrentLanguage] = React.useState(language.shortName);

    let canUpdate = (currentLanguage !== language.shortName);

    const handleChange = (e) => {
        setCurrentLanguage(e.target.value);
    }

    const checked = lang => {
        return lang === currentLanguage;
    }

    const handleSubmit = () => {
        dispatch(updateLanguage(languages.get(currentLanguage)));
        context.onClose();
    }

    return (
        <div className="w-full px-4 md:px-8">
            <form>
                <div className="flex mb-6 items-center justify-between">
                    <div className="flex items-center">
                        <input type="radio" id="turkish" className="radio-control" checked={checked("tr")} value="tr" onChange={handleChange} />
                        <label htmlFor="turkish" className="text-sm text-gray-mid ml-3">Turkish</label>
                    </div>
                    <Icon icon="emojione:flag-for-turkey" className="text-2xl" />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input type="radio" id="english" className="radio-control" checked={checked("en")} value="en" onChange={handleChange} />
                        <label htmlFor="english" className="text-sm ml-3">English</label>
                    </div>
                    <Icon icon="emojione:flag-for-united-states" className="text-2xl" />
                </div>

                <div className="mt-10 mb-8">
                    <Button onClick={handleSubmit} kind="primary" size="small" disabled={!canUpdate}>Update</Button>
                </div>
            </form>
        </div>
    );
}

export default LanguageChangeForm;
