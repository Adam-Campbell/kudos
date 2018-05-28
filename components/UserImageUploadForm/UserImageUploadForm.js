import { Wrapper } from '../Layout';
import { Button } from '../Button';
import {
    FormContainer,
    FormTitle,
    FormDescription,
    Fieldset,
    Legend,
    Label,
    FileInput
} from '../Forms';

const UserImageUploadForm = props => (
    <Wrapper tight>
        <FormContainer>
            <form onSubmit={props.handleSubmit}>
                <FormDescription>Update your avatar</FormDescription>
                <Label htmlFor="avatar">Avatar:</Label>
                <FileInput 
                    type="file"
                    id="avatar"
                    name="avatar"
                    innerRef={props.fileInputRef}
                    onChange={props.checkForFile}
                />
                <Button type="submit">Update</Button>
            </form>
        </FormContainer>
    </Wrapper>
);

export default UserImageUploadForm;
