import Typography from '@mui/material/Typography';
import FusePageCardedHeader from 'src/@fuse/core/FusePageCarded/FusePageCardedHeader';

function UserSettingsHeader() {
	return (
		<FusePageCardedHeader
			header={
				<div className="flex flex-col gap-2 p-4 pb-0 md:px-8 md:pb-0">
					<div>
						<Typography
							variant="h3"
							component="h1"
							className="text-3xl font-semibold tracking-tight md:text-4xl"
							sx={{ lineHeight: 1.2 }}
						>
							Settings
						</Typography>
						<Typography
							variant="subtitle1"
							color="text.secondary"
							className="mt-1 font-medium tracking-tight"
							sx={{ maxWidth: 480 }}
						>
							Manage your password and account security
						</Typography>
					</div>
				</div>
			}
		/>
	);
}

export default UserSettingsHeader;
